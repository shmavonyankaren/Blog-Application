import "server-only";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { cache } from "react";
import db from "@/lib/db";

export const publicProfile = {
  user_id: true,
  username: true,
  first_name: true,
  last_name: true,
  photo: true,
} as const;

// Fetch the current provider state, rather than applying stale webhook payload fields.
// A delayed update after account deletion must not resurrect a local profile.
export async function syncClerkUser(id: string) {
  const clerk = await clerkClient();
  let user;
  try {
    user = await clerk.users.getUser(id);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      error.status === 404
    ) {
      await db.user.deleteMany({ where: { user_id: id } });
      return null;
    }
    throw error;
  }
  const email =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? user.emailAddresses[0]?.emailAddress;
  if (!email) throw new Error("The Clerk account requires an email address.");
  const data = {
    email,
    username: user.username,
    first_name: user.firstName,
    last_name: user.lastName,
    photo: user.imageUrl,
  };
  return db.user.upsert({
    where: { user_id: id },
    create: { user_id: id, ...data },
    update: data,
    select: publicProfile,
  });
}

export const requireUser = cache(async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Sign in to continue.");
  const existing = await db.user.findUnique({
    where: { user_id: userId },
    select: publicProfile,
  });
  const profile = existing ?? (await syncClerkUser(userId));
  if (!profile) throw new Error("Your account is no longer available.");
  return profile;
});

export async function requireSelf(id: string) {
  const { userId } = await auth();
  if (!userId || id !== userId) throw new Error("Not authorized.");
  return userId;
}
