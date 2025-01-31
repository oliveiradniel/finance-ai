import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";

import { dark } from "@clerk/themes";

import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
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
