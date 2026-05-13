import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../src/store/Providers";
import { Navbar } from "../src/views/layout/Navbar";
import { Sidebar } from "../src/views/layout/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TicketRoko - Movie Tickets, Events, Sports & More",
  description: "Book tickets for the latest movies, events, sports, and activities on TicketRoko.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white">
        <Providers>
          <Navbar />
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
