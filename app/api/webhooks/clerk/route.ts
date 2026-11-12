import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { syncClerkUser } from "@/lib/server/users";
import { refresh } from "@/lib/server/action-utils";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!secret)
    return new Response("Webhook configuration missing", { status: 500 });
  const id = req.headers.get("svix-id");
  const timestamp = req.headers.get("svix-timestamp");
  const signature = req.headers.get("svix-signature");
  if (!id || !timestamp || !signature)
    return new Response("Missing signature", { status: 400 });
  let event: WebhookEvent;
  try {
    event = new Webhook(secret).verify(await req.text(), {
      "svix-id": id,
      "svix-timestamp": timestamp,
      "svix-signature": signature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }
  try {
    if (event.type === "user.created" || event.type === "user.updated")
      await syncClerkUser(event.data.id);
    else if (event.type === "user.deleted" && event.data.id)
      await db.user.deleteMany({ where: { user_id: event.data.id } });
    refresh();
    return NextResponse.json({ received: true });
  } catch {
    console.error("Clerk profile synchronization failed", {
      eventId: id,
      eventType: event.type,
    });
    return new Response("Profile synchronization failed", { status: 500 });
  }
}
