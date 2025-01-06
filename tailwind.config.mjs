import { Lexend } from "next/font/google";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        lexend: ["var(--font-lexend)", "serif"],
        geistSans: ["var(--font-geist-sans)", "sans-serif"],
        geistMono: ["var(--font-geist-mono)", "monospace"],
        barlow: ["var(--font-barlow)", "serif"],
      },
      boxShadow: {
        custom: "-42px 0px 114px -40px rgba(0, 0, 0, 0.61)",
      },
    },
  },
  plugins: [],
};
