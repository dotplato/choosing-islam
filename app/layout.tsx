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
