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
  title: "Token Counter - Count Tokens for GPT-4, Claude & LLMs | Free Online Tool",
  description:
    "Free online token counter for LLMs. Instantly count tokens for GPT-4, GPT-3.5, Claude, and other AI models. Visualize tokenization, count words and characters. Perfect for prompt engineering.",
  keywords: [
    "token counter",
    "tokenizer",
    "GPT-4 tokens",
    "LLM tokens",
    "Claude tokens",
    "OpenAI tokenizer",
    "tiktoken",
    "count tokens",
    "prompt tokens",
    "AI token calculator",
    "token visualization",
  ],
  authors: [{ name: "Mike Tromba", url: "https://mike.gg" }],
  creator: "Mike Tromba",
  metadataBase: new URL("https://tokencounter.space"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Token Counter - Count Tokens for GPT-4, Claude & LLMs",
    description:
      "Free online token counter. Instantly count and visualize tokens for GPT-4, Claude, and other AI models.",
    url: "https://tokencounter.space",
    siteName: "Token Counter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Token Counter - Count tokens for GPT-4, Claude & more",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Counter - Count Tokens for GPT-4, Claude & LLMs",
    description:
      "Free online token counter. Instantly count and visualize tokens for GPT-4, Claude, and other AI models.",
    images: ["/og-image.png"],
    creator: "@miketromba",
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
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <meta name="theme-color" content="#0a0a12" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
