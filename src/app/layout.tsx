import "../styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Campus Platform",
  description:
    "The premium, distraction-free utility for discovering university events and communities.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/**
 * NotionInter-equivalent: Inter with lining numerals & localized forms.
 * CSS variable --font-inter maps into --font-sans in globals.css @theme.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  // Load all 4 weights from the Tactile Utility type system
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      {/* Body: warm neutral bg, near-black text — set via globals.css base layer */}
      <body>
        <ThemeProvider>
          <AuthProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
