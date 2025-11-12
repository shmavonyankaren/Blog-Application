import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "A simple blog app built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <div className="fixed top-0 left-0 right-0 z-50 bg-white">
            <Header />
          </div>
          <main className="flex-1 min-h-0 flex flex-col pt-16">
            <ReduxProvider>{children}</ReduxProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
