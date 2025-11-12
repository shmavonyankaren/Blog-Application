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
      // Add any other external image hosts you use for blog images
      // { protocol: "https", hostname: "your-cdn.example.com" }
    ],
  },
};

export default nextConfig;
