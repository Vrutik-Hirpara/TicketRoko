import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../src/store/Providers";
import { Navbar } from "../src/views/layout/Navbar";
import { Sidebar } from "../src/views/layout/Sidebar";
import { CategoryNav } from "../src/components/layout/CategoryNav";
import { Footer } from "../src/components/layout/Footer";
import { ScrollToTop } from "../src/components/layout/ScrollToTop";

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
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-gray-900 bg-white">
        <Providers>
          <ScrollToTop />
          <Navbar />
          <Sidebar />
          <div className="mt-[64px] md:mt-[72px]">
            {/* <CategoryNav /> */}
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
