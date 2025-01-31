import type { Metadata } from "next";

import { dark } from "@clerk/themes";

import { ClerkProvider } from "@clerk/nextjs";

import { Mulish } from "next/font/google";

import "./globals.css";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "FinanceAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${mulish.className} dark`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
