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
    default: "A Brief Guide to Number Theory | Olympiad Number Theory Book by Aritra Saha & Riddhiman Seal",
    template: "%s | A Brief Guide to Number Theory",
  },
  description:
    "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal — the definitive Olympiad Number Theory Book with 20-page PDF preview, chapter contents, and 500+ practice problem hints for RMO, INMO, and IMO.",
  applicationName: "A Brief Guide to Number Theory",
  authors: [
    { name: "Aritra Saha" },
    { name: "Riddhiman Seal" },
  ],
  creator: "Aritra Saha & Riddhiman Seal",
  keywords: [
    "A Brief Guide to Number Theory",
    "brief guide to number theory",
    "A brief guide to Number Theory",
    "Brief Guide to Number Theory",
    "brief guide number theory",
    "ABGNT",
    "Olympiad Number Theory Book",
    "olympiad number theory book",
    "best olympiad number theory book",
    "Aritra Saha",
    "Riddhiman Seal",
    "Olympiad Number Theory",
    "INMO number theory book",
    "IMO number theory book",
    "RMO number theory book",
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
    title: "A Brief Guide to Number Theory | Olympiad Number Theory Book",
    description:
      "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal — the definitive Olympiad Number Theory Book with 20-page PDF preview, chapter contents, and 500+ practice problem hints for RMO, INMO, and IMO.",
    url: "https://www.numbertheoryguide.in/",
    siteName: "A Brief Guide to Number Theory",
    images: [
      {
        url: "/book-cover.png",
        width: 1200,
        height: 630,
        alt: "A Brief Guide to Number Theory by Aritra Saha and Riddhiman Seal — Olympiad Number Theory Book",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Brief Guide to Number Theory | Olympiad Number Theory Book",
    description:
      "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal — the definitive Olympiad Number Theory Book with 20-page PDF preview, chapter contents, and 500+ practice problem hints for RMO, INMO, and IMO.",
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
  verification: {
    other: {
      "msvalidate.01": "57021ADC8190A7BAD3E3425966B6A23D",
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
      "alternateName": [
        "A Brief Guide to Number Theory",
        "Brief Guide to Number Theory",
        "ABGNT",
        "Olympiad Number Theory Book"
      ],
      "description":
        "Official website for 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal — the premier Olympiad Number Theory Book with 20-page preview, chapter contents, and 500+ practice problem hints.",
      "inLanguage": "en"
    },
    {
      "@type": "Book",
      "@id": "https://www.numbertheoryguide.in/#book",
      "name": "A Brief Guide to Number Theory",
      "alternateName": [
        "A Brief Guide to Number Theory",
        "Brief Guide to Number Theory",
        "ABGNT",
        "Olympiad Number Theory Book",
        "A Brief Guide to Number Theory: Olympiad Number Theory Book"
      ],
      "headline": "A Brief Guide to Number Theory",
      "author": [
        {
          "@type": "Person",
          "name": "Aritra Saha",
          "jobTitle": "Author & Educator",
          "sameAs": [
            "https://artofproblemsolving.com/community/user/CrystalMind",
            "https://www.youtube.com/@OMath"
          ]
        },
        {
          "@type": "Person",
          "name": "Riddhiman Seal",
          "jobTitle": "Author & Educator",
          "sameAs": [
            "https://artofproblemsolving.com/community/user/simplisticformulas",
            "https://www.youtube.com/@rubiksbrothers6442"
          ]
        }
      ],
      "url": "https://www.numbertheoryguide.in/",
      "image": "https://www.numbertheoryguide.in/book-cover.png",
      "sameAs": "https://amzn.in/d/027tMJIL",
      "offers": {
        "@type": "Offer",
        "url": "https://amzn.in/d/027tMJIL",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "INR"
      },
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
      "genre": [
        "Mathematics",
        "Number Theory",
        "Olympiad Preparation",
        "Olympiad Number Theory Book"
      ],
      "about": [
        "Number Theory",
        "Olympiad Number Theory",
        "Mathematical Olympiad",
        "IMO",
        "INMO"
      ],
      "keywords": "A Brief Guide to Number Theory, brief guide to number theory, ABGNT, Olympiad Number Theory Book, IMO, INMO, RMO, Olympiad Math"
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.numbertheoryguide.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is A Brief Guide to Number Theory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Brief Guide to Number Theory (ABGNT) is an Olympiad Number Theory Book written by Aritra Saha and Riddhiman Seal specifically for students preparing for RMO, INMO, and the International Mathematical Olympiad (IMO)."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the authors of A Brief Guide to Number Theory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The book is written by Aritra Saha (INMO Awardee) and Riddhiman Seal (RMO Mumbai Topper), both experienced Olympiad competitors and mentors at the Online Math Club."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I buy or order A Brief Guide to Number Theory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can order the official paperback edition of A Brief Guide to Number Theory on Amazon India via https://amzn.in/d/027tMJIL."
          }
        },
        {
          "@type": "Question",
          "name": "What topics does this Olympiad Number Theory Book cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The book covers modular arithmetic, divisibility, orders, primitive roots, quadratic residues, p-adic valuation, integer polynomials, cyclotomic polynomials, functional equations, and combinatorial number theory, complete with over 500 practice problem hints."
          }
        }
      ]
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
