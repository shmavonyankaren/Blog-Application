import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogSpace",
  description: "A simple blog app built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`flex flex-col min-h-screen bg-white dark:bg-slate-950 ${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
          suppressHydrationWarning
        >
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-sm dark:shadow-slate-800/50 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
              <Header />
            </div>
            <main className="flex-1 min-h-0 flex flex-col pt-16 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
