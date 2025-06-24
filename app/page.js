
'use client';

import { useState, useEffect } from 'react';
import Section1 from "./home/components/section1";
import Section2 from "./home/components/section2";
import Section3 from "./home/components/section3";

export default function Home() {
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSections(true);
    }, 3000); // Задержка 3 секунды

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      <Section1 />
      {showSections ? (
        <>
          <Section2 />
          <Section3 />
        </>
      ) : (
        <div className="w-full h-screen bg-white"></div>
      )}
    </main>
  )
}