import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pantrix — Cook smarter with what you already have",
  description:
    "AI-powered smart pantry: track groceries, catch expiry dates, match recipes from what you own, and shop with intention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col text-[15px] leading-relaxed"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
