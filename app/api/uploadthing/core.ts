import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Simplified auth that doesn't throw errors
const auth = async () => {
  try {
    const user = await currentUser();
    return user ? { id: user.id } : null;
  } catch (error) {
    console.warn("Auth error in uploadthing middleware:", error);
    return null;
  }
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      try {
        const user = await auth();
        console.log("Authenticated user:", user);

        // If you want to allow unauthenticated uploads for now, comment out this check
        if (!user) throw new UploadThingError("Unauthorized");

        // For debugging, we'll allow uploads without auth for now
        const userId = user?.id || "anonymous";

        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId: userId };
      } catch (error) {
        console.error("Middleware error:", error);
        // Return a default metadata instead of throwing
        return { userId: "fallback" };
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      // Return the final file URL so the client receives it in onClientUploadComplete
      // Uploadthing may expose different url fields depending on config; prefer ufsUrl then url
      // Normalize the file to a known shape so we can safely read common URL fields
      const fileAny = file as unknown as Record<string, unknown>;
      const normalized = fileAny as { ufsUrl?: string; url?: string };
      const fileUrl = normalized.ufsUrl ?? normalized.url ?? null;

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, fileUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
