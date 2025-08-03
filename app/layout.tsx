import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Ultimate Free Converter Tools | Fast & Accurate Conversion",
  description: "Free online tools for converting currencies, units, time zones, and more. Accurate real-time conversions with no installation required. Try now!",
  keywords: "free converter, online converter, currency converter, unit converter, time converter, measurement converter, calculator, conversion tools, currency exchange",
  openGraph: {
    title: "Ultimate Free Converter Tools | Fast & Accurate Conversion",
    description: "Free online tools for converting currencies, units, time zones, and more. Accurate real-time conversions with no installation required.",
    url: "https://app.instapure.fun", // Replace with actual domain
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // Replace with actual OG image
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Free Converter Tools | Fast & Accurate Conversion",
    description: "Free online tools for converting currencies, units, time zones, and more. Accurate real-time conversions with no installation required.",
    images: ["https://app.instapure.fun/og-image.jpg"], // Replace with actual Twitter image
  },
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://app.instapure.fun", // Replace with actual domain
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

import Link from 'next/link';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="author" content="Your Name" />
      </head>
      <body>
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-10">
                <Link href="/" className="text-xl font-bold text-blue-600">Converter Tools</Link>
                <div className="hidden md:flex space-x-6">
                  <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                  <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
                  <Link href="/privacy-policy" className="text-gray-700 hover:text-blue-600 transition">Privacy</Link>
                  <Link href="/terms-of-service" className="text-gray-700 hover:text-blue-600 transition">Terms</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
