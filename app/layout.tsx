import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SkipLink from "@/components/SkipLink";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KTU Mate — AI-Powered Academic Companion for KTU Students",
  description:
    "Study smarter with KTU Mate. Personalized study planning, Series Test analysis, DSA progress tracking, and AI academic assistance with Avigu.",
  keywords: [
    "KTU",
    "KTU Mate",
    "Avigu",
    "KTU Engineering",
    "Series Tests",
    "DSA Practice",
    "Study Planning",
    "Kerala Technological University",
  ],
  authors: [{ name: "Avignesh T K", url: "https://github.com/avigneshtk" }],
  creator: "Avignesh T K",
  openGraph: {
    title: "KTU Mate — AI-Powered Academic Companion for KTU Students",
    description:
      "Personalized study planning, Series Test analysis, DSA progress tracking, and AI academic assistance with Avigu.",
    url: "https://ktu-mate.vercel.app",
    siteName: "KTU Mate",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#090d16] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
