import type { Metadata } from "next";
import { Inter, Montserrat, Poppins, Red_Hat_Display, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ['300','400','500','600','700','800','900'] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ['700'] });
const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], variable: "--font-red-hat", weight: ['300','400','500','600','700','800'] });

export const metadata: Metadata = {
  title: "Om Sai Intex | Premium Interior Design & Turnkey Solutions",
  description: "High-end corporate offices, hybrid agile offices, and creative hubs. Premium interior design and turnkey solutions by Om Sai Intex Pvt. Ltd.",
  keywords: ["interior design", "turnkey solutions", "corporate office", "Bangalore", "commercial interiors"],
  openGraph: {
    title: "Om Sai Intex | Premium Interior Design & Turnkey Solutions",
    description: "Turning vision into reality with premium interior design and turnkey solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${redHatDisplay.variable} bg-black text-white antialiased`}>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white cursor-default">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
