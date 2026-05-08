import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/landing/CursorGlow";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Sparring — Argue with AI. Sharpen your thinking.",
  description:
    "Voice-first AI debate sparring. State a position. AI argues the strongest possible counter. Live logic-strength scoring. 5 rounds, real verdict.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Sparring — Argue with AI",
    description: "5 rounds. Live scoring. Sharpen your thinking.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} dark`}>
      <head>
        <link rel="preload" as="video" href="/video/gear5.mp4" type="video/mp4" />
      </head>
      <body className="bg-obsidian-900 text-silver grain antialiased">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
