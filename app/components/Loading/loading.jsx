'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '@/public/images/logowhite.png';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const animationComplete = useRef(false);
  const startTime = useRef(Date.now());
  const MIN_LOAD_TIME = 2500; // 2.5 секунды
  
  useEffect(() => {
    // Запускаем анимацию прогресса
    const startAnimation = () => {
      const start = startTime.current;
      const duration = MIN_LOAD_TIME;
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - start;
        
        if (elapsed < duration) {
          // Плавно увеличиваем прогресс до 99%
          const progress = Math.min(99, (elapsed / duration) * 100);
          setProgress(Math.floor(progress));
          requestAnimationFrame(animate);
        } else if (!animationComplete.current) {
          // Устанавливаем 100% и помечаем как завершенное
          animationComplete.current = true;
          setProgress(100);
          
          // Ждем 200мс перед скрытием
          setTimeout(() => {
            setShow(false);
          }, 200);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    startAnimation();
    
    return () => {
      animationComplete.current = true;
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#32ba4e] z-50">
      <div className="relative">
        {/* Круглый фон */}
        <motion.div 
          className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Внешний круг */}
          <motion.div 
            className="absolute w-36 h-36 border-2 border-white/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Логотип */}
          <motion.div className="relative z-10">
            <Image 
              src={logo} 
              alt="Loading" 
              width={70}
              height={70}
              className="filter drop-shadow-lg"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Процент загрузки */}
        <motion.div className="mt-6 text-white text-center">
          <div className="text-2xl font-medium">{progress}%</div>
          <div className="text-sm opacity-80 mt-1">Загрузка...</div>
        </motion.div>
      </div>
    </div>
  );
}