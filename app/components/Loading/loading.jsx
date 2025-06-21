'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '@/public/images/logowhite.png';

export default function Loading({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
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
          
          // Запускаем анимацию исчезновения
          setIsExiting(true);
          
          // Вызываем колбэк после небольшой задержки, чтобы анимация успела начаться
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 50);
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
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-[#00c853] z-50 overflow-hidden"
      initial={{ clipPath: 'circle(141% at 50% 45%)' }}
      exit={{ 
        clipPath: 'circle(0% at 50% 45%)',
        transition: { 
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      onAnimationComplete={onComplete}
    >
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
          <div className="relative z-10">
            <Image 
              src={logo} 
              alt="Loading" 
              width={70}
              height={70}
              className="filter drop-shadow-lg"
              priority
            />
          </div>
        </motion.div>

        {/* Процент загрузки */}
        <motion.div className="mt-6 text-white text-center">
          <div className="text-2xl font-medium">{progress}%</div>
        </motion.div>
      </div>
    </motion.div>
  );
}