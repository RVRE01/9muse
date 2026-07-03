import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeRootProvider } from "@/components/theme/ThemeRootProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "9MUSE Premium Wireframe",
  description:
    "Premium red, black, and silver responsive product wireframe with media placeholders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2025-11-02T22:52:30-05:00 - Mounting theme provider to enable color mode tokens. */}
        <ThemeRootProvider>
          {children}
        </ThemeRootProvider>
      </body>
    </html>
  );
}
