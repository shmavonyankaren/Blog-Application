import type { NextConfig } from "next";

// Allow external images (Clerk user avatars, blog images, etc.)
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      // Allow Wikimedia (and other commons) images used in blog content
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      // Add any other external image hosts you use for blog images
      // { protocol: "https", hostname: "your-cdn.example.com" }
    ],
  },
};

export default nextConfig;
