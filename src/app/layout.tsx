import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Your Name - Developer & Engineer",
  description: "Full-Stack Developer • Blockchain Engineer • Technology Enthusiast. Building the future one commit at a time.",
  keywords: ["developer", "blockchain", "engineer", "full-stack", "crypto", "web3", "portfolio"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    title: "Your Name - Developer & Engineer",
    description: "Full-Stack Developer • Blockchain Engineer • Technology Enthusiast",
    url: "https://yourportfolio.com",
    siteName: "Your Name Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} 
        bg-slate-900 text-white font-mono antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
