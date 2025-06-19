'use client'
import { useRef } from "react";
import React from 'react';
import Image from 'next/image';

export default function CircleCard({ image }) {
    const cardRef = useRef(null);
  
    // 3D Parallax эффект
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x / 12}deg) rotateX(${-y / 12}deg) scale(1.13)`;
    };
    const handleMouseLeave = () => {
      const card = cardRef.current;
      card.style.transform = "";
    };
  
    return (
      <div
        ref={cardRef}
        className="
          relative rounded-full overflow-hidden cursor-pointer
          w-[200px] h-[200px] md:w-[250px] md:h-[250px] flex items-center justify-center
          transition-all duration-700   
          group
          before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-8 before:border-transparent before:animate-[rainbow-border_2s_linear_infinite]
          hover:shadow-[0_0_30px_10px_rgba(251,191,36,0.6),0_0_0_16px_rgba(59,130,246,0.3)]
          hover:animate-pulse
        "
        style={{ perspective: "600px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={image}
          alt="photo"
          width={200}
          height={200}
          className="object-cover rounded-full w-full h-full transition-all duration-700"
          draggable={false}
        />
        {/* Вспышка при ховере */}
        <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-300 bg-white/20 blur-[4px]"></div>
      </div>
    );
  }