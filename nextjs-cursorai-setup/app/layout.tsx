/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntProvider } from "@/providers/AntProvider";
import { LangProvider } from "@/providers/LangProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Header, Footer } from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Setup",
  description: "File Structure, Project Setup, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AntProvider>
          <QueryProvider>
            <LangProvider>
              <Header />
              {children}
              <Footer />
            </LangProvider>
          </QueryProvider>
        </AntProvider>
      </body>
    </html>
  );
}
