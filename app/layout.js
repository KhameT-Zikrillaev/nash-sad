'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Section4 from "./home/components/section4";
import React, { useEffect, useState } from 'react';
import Loading from "./components/Loading/loading";
import '../i18n'
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
    // Даем загрузчику 2.7 секунды на выполнение анимации
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2700);

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
            <Section4/>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
