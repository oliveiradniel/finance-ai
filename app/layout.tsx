import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";

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
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
