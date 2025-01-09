import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Barlow_Condensed } from "next/font/google";
import Head from "next/head";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "800", "600", "900"], // Include the weights you'll use
});
const barlow_condensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "800", "600", "900"], // Include the weights you'll use
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bday Card | Create and Share Customize Birthday Cards for Free!",
  description:
    "A Free customized birthday card creator | Surprise your loved ones on their birthday.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${barlow_condensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
