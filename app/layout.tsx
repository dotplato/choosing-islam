import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Birdcomponent from "@/components/Birdcomponent";
import { getQuranArticles } from "@/lib/contentful";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Islamic Dawah Center of Belize - Discover Knowledge, Build Understanding",
  description:
    "Your journey to enlightenment begins here. Explore resources, connect with community, and grow in faith through education and dialogue.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quranArticles = await getQuranArticles();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col relative">
          <Birdcomponent />

          <Header quranArticles={quranArticles} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
