'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



import React, { useEffect, useState } from 'react';
import Loading from "./components/Loading/loading";

export default function RootLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showLoader && <Loading />}
        {!showLoader && (
          <>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
