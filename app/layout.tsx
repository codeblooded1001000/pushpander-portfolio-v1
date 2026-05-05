import type { Metadata } from "next";
import { Press_Start_2P, VT323, Special_Elite } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

export const metadata: Metadata = {
  title: "Pushpander Singh — Backend Engineer",
  description:
    "Backend engineer specializing in NestJS, TypeScript, Postgres, Redis, RabbitMQ, and Kafka. Available for SDE2 roles and freelance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${vt323.variable} ${specialElite.variable} font-mono text-[20px] leading-relaxed scanlines`}
      >
        {children}
      </body>
    </html>
  );
}
