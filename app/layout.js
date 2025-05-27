'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import React, { useEffect, useState } from 'react';
import Loading from "./components/Loading/loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const MIN_LOAD_TIME = 4000; // 4 секунды
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = MIN_LOAD_TIME - elapsed;

      // Гарантируем минимум 4 секунды
      const delay = remainingTime > 0 ? remainingTime : 0;

      setTimeout(() => setShowLoader(false), delay);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
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
