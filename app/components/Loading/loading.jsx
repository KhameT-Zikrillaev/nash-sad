'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import n from '@/public/images/logo/n.webp'
import a from '@/public/images/logo/a.webp'
import sh from '@/public/images/logo/sh.webp'
import s from '@/public/images/logo/s.webp'
import a2 from '@/public/images/logo/a2.webp'
import d from '@/public/images/logo/d.webp'
import b from '@/public/images/logo/b.webp'
import b2 from '@/public/images/logo/b2.webp'

export default function Loading() {
  // Последовательность появления элементов
  const sequence = [
    { id: 'n', delay: 0.2 },
    { id: 'a', delay: 0.4 },
    { id: 'sh', delay: 0.6 },
    { id: 'b', delay: 0.8, isIcon: true },
    { id: 's', delay: 1.0 },
    { id: 'a2', delay: 1.2 },
    { id: 'd', delay: 1.4 },
    { id: 'b2', delay: 1.6, isIcon: true }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        className="relative w-48 h-48"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 100, 
            damping: 10,
            delay: 0.1
          } 
        }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className='box w-[160px] bg-[#32ba4e] rounded-full mx-auto h-[160px] flex flex-col justify-center items-center'>
            <div className='row-1 flex'>
              {/* Буква Н */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Image className='w-[45px] h-[50px] mt-1' src={n} alt="n" />
              </motion.div>
              
              {/* Буква А */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Image className='w-[40px] h-[40px] -ml-[7px] mt-2' src={a} alt="a" />
              </motion.div>
              
              {/* Буква Ш */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Image className='w-[40px] h-[40px] -ml-[5px]' src={sh} alt="sh" />
              </motion.div>
            </div>
            
            <div className='row-2 flex -mt-2'>
              {/* Значок b */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                <Image className='w-[30px] h-[20px] -mr-[4px] mt-1' src={b} alt="b" />
              </motion.div>
              
              {/* Буква С */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.0,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Image className='w-[40px] h-[40px] mt-1' src={s} alt="s" />
              </motion.div>
              
              {/* Буква А */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Image className='w-[40px] h-[40px] -ml-[7px] -mt-1' src={a2} alt="a2" />
              </motion.div>
              
              {/* Буква Д */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Image className='w-[45px] -ml-[10px] -mt-3' src={d} alt="d" />
              </motion.div>
              
              {/* Значок b2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                <Image className='w-[30px] h-[20px] -ml-[17px] relative z-50 mt-0' src={b2} alt="b2" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Крутящиеся круги вокруг лого */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute inset-0 border-4 border-transparent border-b-green-300 border-l-green-300 rounded-full"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Текст "Загрузка..." с мерцанием */}
      <motion.div
        className="absolute bottom-1/4 text-green-500 text-lg font-bold"
        animate={{
          opacity: [0.6, 1, 0.6],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Загрузка...
      </motion.div>

      {/* Прогресс-бар */}
      <motion.div 
        className="absolute bottom-1/5 w-64 h-1 bg-gray-200 rounded-full overflow-hidden shadow-inner"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-green-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}