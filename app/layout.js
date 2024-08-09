import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head'; // Import the Head component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shurima Shuffle - ARAM Champion Generator",
  description: "Generate random champions for ARAM in League of Legends. Spice up your matches with a random champion generator!",
  icon: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icon} />
        <meta property="og:title" content="League of Legends ARAM Randomizer - Spice Up Your Matches!" />
        <meta property="og:description" content="Discover a new way to play LoL ARAM with our Randomizer. Challenge yourself and your friends with random champions and strategies." />
        <meta property="og:url" content="www.shurimashuffle.com" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="aram champion randomizer, aram randomizer, aram random champions, league of legends aram, lol aram randomizer"/>
        <meta property="og:site_name" content="Shurima Shuffle - ARAM Champion Randomizer" />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
