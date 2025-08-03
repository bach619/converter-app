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
    url: "https://yourdomain.com", // Replace with actual domain
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
    images: ["https://yourdomain.com/og-image.jpg"], // Replace with actual Twitter image
  },
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://yourdomain.com", // Replace with actual domain
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="author" content="Your Name" />
      </head>
      <body>{children}</body>
    </html>
  );
}
