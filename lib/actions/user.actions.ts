"use server";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import {
  publicProfile,
  requireSelf,
  requireUser,
  syncClerkUser,
} from "@/lib/server/users";
import { mutation, refresh, text } from "@/lib/server/action-utils";
import { sendEmail } from "@/lib/utils";
import type { CreateUserParams, UpdateUserParams } from "@/lib/types";
export async function createUser(user: CreateUserParams) {
  return mutation(async () => {
    const id = await requireSelf(user.clerkId);
    return syncClerkUser(id);
  });
}
export async function updateUser(clerkId: string, _user: UpdateUserParams) {
  void _user; // Provider profile is authoritative; never apply browser-submitted fields.
  return mutation(async () => {
    await requireSelf(clerkId);
    return syncClerkUser(clerkId);
  });
}
export async function deleteUser(clerkId: string) {
  return mutation(async () => {
    await requireSelf(clerkId);
    const result = await db.user.deleteMany({ where: { user_id: clerkId } });
    refresh();
    return result;
  });
}
export async function getUserById(userId: string) {
  const session = await auth();
  if (session.userId === userId) await requireUser();
  const user = await db.user.findUnique({
    where: { user_id: userId },
    select: publicProfile,
  });
  if (!user) notFound();
  return user;
}
export async function recoverCurrentProfile() {
  return mutation(() => requireUser());
}
export async function sendContactForm(form: FormData) {
  // The contact form remains public and does not write to the database.
  const email = text(form, "email", 255);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Invalid email.");
  const result = await sendEmail(
    text(form, "name", 255),
    email,
    text(form, "subject", 500),
    text(form, "message", 10000),
  );
  if (!result.success)
    throw new Error("Unable to send your message. Please try again.");
}
