import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { ToggleProvider } from "@/context/ToggleProvoider";
import {Inter,Roboto,Poppins} from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogsite",
  description: "This is a blog site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToggleProvider>
        <div className="container">
        <Navbar/>
        {children}
        <Footer/>
        </div>
        </ToggleProvider>
      </body>
      
    </html>
  );
}
