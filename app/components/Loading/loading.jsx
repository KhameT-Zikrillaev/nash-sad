'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import n from '@/public/images/logo/n.webp';
import a from '@/public/images/logo/a.webp';
import sh from '@/public/images/logo/sh.webp';
import s from '@/public/images/logo/s.webp';
import a2 from '@/public/images/logo/a2.webp';
import d from '@/public/images/logo/d.webp';
import b from '@/public/images/logo/b.webp';
import b2 from '@/public/images/logo/b2.webp';

export default function Loading() {
  // Варианты анимации для букв
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(4px)'
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    })
  };

  // Анимация фона
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#32ba4e] z-50">
      <motion.div
        className="relative"
        initial="initial"
        animate="animate"
        variants={backgroundVariants}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Первая строка букв */}
          <div className="flex mb-1">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-12 h-12" src={n} alt="n" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
            
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-10 h-10 -ml-1 mt-1" src={a} alt="a" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
            
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-10 h-10 -ml-1" src={sh} alt="sh" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
          </div>
          
          {/* Вторая строка букв */}
          <div className="flex -mt-1">
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-7 h-5 -mr-1 mt-2" src={b} alt="b" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
            
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-10 h-10 mt-1" src={s} alt="s" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
            
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-10 h-10 -ml-1 -mt-1" src={a2} alt="a2" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
            
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-12 -ml-2 -mt-2" src={d} alt="d" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
            
            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              <Image className="w-7 h-5 -ml-3 mt-2" src={b2} alt="b2" style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
          </div>
        </div>

        {/* Анимированные точки для оживления фона */}
        <motion.div 
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white opacity-10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-white opacity-10"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>
    </div>
  );
}