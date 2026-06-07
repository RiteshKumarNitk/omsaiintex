import type { Metadata } from "next";
import { Inter, Montserrat, Poppins, Red_Hat_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import ClientCursorWrapper from "@/components/animations/ClientCursorWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ['300','400','500','600','700','800','900'] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ['700'] });
const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], variable: "--font-red-hat", weight: ['300','400','500','600','700','800'] });

export const metadata: Metadata = {
  title: "MDS Interior Pvt. Ltd. | Premium Interior Design & Turnkey Solutions in Bangalore",
  description: "MDS Interior delivers premium corporate office interiors, hybrid agile workspaces, and commercial fit-out solutions across India. 20+ years of expertise, 1400+ projects completed.",
  keywords: ["interior design", "turnkey solutions", "corporate office interior design", "commercial interiors Bangalore", "office fit-out India", "modular office furniture", "workspace design", "office interior design company Bangalore", "corporate workspace solutions India", "commercial fit-out contractors Bangalore"],
  openGraph: {
    title: "MDS Interior Pvt. Ltd. | Premium Interior Design & Turnkey Solutions",
    description: "Premium corporate office interiors, hybrid workspaces, and commercial fit-out solutions. 1400+ projects delivered across India.",
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
          <main className="flex-grow relative z-[1] pb-[500px] md:pb-[420px]">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <ClientCursorWrapper />
      </body>
    </html>
  );
}
