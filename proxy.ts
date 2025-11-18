import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about-us",
  "/contact-us",
  "/faq",
  "/all-blogs",
  "/blog/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Do not protect public routes
  if (isPublicRoute(req)) return;

  // Skip protecting API routes and internal requests to avoid interfering with server-side
  // fetches (like fetch from server-components or internal HTTP calls).
  // This prevents the middleware from rewriting/redirecting server-to-server calls.
  const pathname = req.nextUrl?.pathname || "";
  if (pathname.startsWith("/api") || pathname.startsWith("/trpc")) return;

  // Otherwise enforce authentication
  await auth.protect();
});

// Configure matcher to run middleware for page routes only (exclude API and static files).
export const config = {
  matcher: [
    // Run middleware for all non-static, non-_next, non-api routes
    "/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
