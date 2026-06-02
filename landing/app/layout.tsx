import type { Metadata } from "next";
import { Fraunces, Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dmmono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Becipe — Cooking, but make it social",
  description:
    "Save recipes from anywhere, cook them step-by-step, log your tries, and follow the cooks you love. Becipe is the social cookbook for people who actually cook.",
  openGraph: {
    title: "Becipe — Cooking, but make it social",
    description:
      "Save recipes from anywhere, cook them step-by-step, log your tries, and follow the cooks you love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
