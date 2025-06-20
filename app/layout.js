'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Section4 from "./home/components/section4";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    // Автоматически скрываем загрузчик после 4 секунд на всякий случай
    const timer = setTimeout(() => {
      if (!isLoadingComplete) {
        setShowLoader(false);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isLoadingComplete]);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
    // Даем время на завершение анимации (1.2 секунды)
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <AnimatePresence mode='wait'>
          {showLoader ? (
            <Loading key="loader" onComplete={handleLoadingComplete} />
          ) : (
            <motion.div
              key="content"
              initial={{ clipPath: 'circle(0% at 50% 45%)', opacity: 0 }}
              animate={{ 
                clipPath: 'circle(141% at 50% 45%)',
                opacity: 1,
                transition: { 
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="w-full"
            >
              <Header />
              <main>
                {children}
              </main>
              <Section4/>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
