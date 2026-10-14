import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://www.numbertheoryguide.in"),
  title: {
    default: "A Brief Guide to Number Theory | By Aritra Saha & Riddhiman Seal",
    template: "%s | A Brief Guide to Number Theory",
  },
  description:
    "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal. Explore Olympiad number theory chapters, 20-page PDF preview, and 500+ practice problem hints for RMO, INMO, and IMO.",
  applicationName: "A Brief Guide to Number Theory",
  authors: [
    { name: "Aritra Saha" },
    { name: "Riddhiman Seal" },
  ],
  creator: "Aritra Saha & Riddhiman Seal",
  keywords: [
    "A Brief Guide to Number Theory",
    "brief guide to number theory",
    "brief guide number theory",
    "ABGNT",
    "Aritra Saha",
    "Riddhiman Seal",
    "Olympiad Number Theory",
    "INMO",
    "RMO",
    "IMO",
    "number theory hints",
    "number theory book",
  ],
  alternates: {
    canonical: "https://www.numbertheoryguide.in/",
  },
  openGraph: {
    title: "A Brief Guide to Number Theory | By Aritra Saha & Riddhiman Seal",
    description:
      "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal. Explore Olympiad number theory chapters, 20-page PDF preview, and 500+ practice problem hints for RMO, INMO, and IMO.",
    url: "https://www.numbertheoryguide.in/",
    siteName: "A Brief Guide to Number Theory",
    images: [
      {
        url: "/book-cover.png",
        width: 1200,
        height: 630,
        alt: "A Brief Guide to Number Theory - Book by Aritra Saha & Riddhiman Seal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Brief Guide to Number Theory | By Aritra Saha & Riddhiman Seal",
    description:
      "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal. Explore Olympiad number theory chapters, 20-page PDF preview, and 500+ practice problem hints for RMO, INMO, and IMO.",
    images: ["/book-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.numbertheoryguide.in/#website",
      "url": "https://www.numbertheoryguide.in/",
      "name": "A Brief Guide to Number Theory",
      "alternateName": ["ABGNT", "Brief Guide to Number Theory"],
      "description":
        "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal. Explore Olympiad number theory chapters, 20-page PDF preview, and 500+ practice problem hints for RMO, INMO, and IMO.",
      "inLanguage": "en"
    },
    {
      "@type": "Book",
      "@id": "https://www.numbertheoryguide.in/#book",
      "name": "A Brief Guide to Number Theory",
      "alternateName": "ABGNT",
      "author": [
        {
          "@type": "Person",
          "name": "Aritra Saha"
        },
        {
          "@type": "Person",
          "name": "Riddhiman Seal"
        }
      ],
      "url": "https://www.numbertheoryguide.in/",
      "image": "https://www.numbertheoryguide.in/book-cover.png",
      "sameAs": "https://amzn.in/d/027tMJIL",
      "workExample": {
        "@type": "Book",
        "bookFormat": "https://schema.org/Paperback",
        "inLanguage": "en",
        "potentialAction": {
          "@type": "ReadAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.numbertheoryguide.in/"
          }
        }
      },
      "description":
        "An Olympiad number theory book covering modular arithmetic, divisibility, quadratic residues, p-adic valuation, number-theoretic functional equations, and combinatorial number theory for INMO and IMO.",
      "genre": "Mathematics / Olympiad Preparation",
      "about": "Number Theory"
    }
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
