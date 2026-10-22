import "../styles/globals.css";

import { type Metadata } from "next";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "@/trpc/react";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { PLATFORM_LOCALE } from "@/lib/platform-date";

export const metadata: Metadata = {
  title: "UniFeed",
  description:
    "The premium, distraction-free utility for discovering university events and communities.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang={PLATFORM_LOCALE} suppressHydrationWarning>
      {/* Body: warm neutral bg, near-black text — set via globals.css base layer */}
      <body>
        <ThemeProvider>
          <AuthProvider>
            <TRPCReactProvider>
              {children}
              {modal}
              <Toaster richColors position="top-right" />
            </TRPCReactProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
