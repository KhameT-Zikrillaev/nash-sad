'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import leftabastrack from '@/public/images/left-abstrack.png';
import rightabastrack1 from '@/public/images/right-1-abstrack.png';
import section3photo1 from '@/public/images/section3photo1.png';
import section3photo3 from '@/public/images/section3photo3.png';

function Section3Video() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div 
      className="bg-blue-100 rounded-[60px] h-[440px] w-full relative overflow-hidden p-0"
      whileHover={{ scale: 0.99 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        src="/video/sok.mp4"
        className="w-full h-full object-cover rounded-[60px]"
        style={{ display: 'block' }}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls={false}
      />
      
      {/* Анимированная кнопка Play */}
      {!isPlaying && (
        <motion.button
          onClick={togglePlay}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none"
          style={{ width: 120, height: 120, background: 'none', border: 'none', cursor: 'pointer' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <svg width="120" height="120" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="32,24 60,40 32,56" fill="#FFD600" />
          </svg>
        </motion.button>
      )}
      
      {/* Нижняя панель с анимацией */}
      <motion.div 
        className="absolute left-0 bottom-0 md:text-lg lg:text-xl w-full flex justify-between items-center md:px-8 px-4 py-5"
        style={{ background: 'rgba(153, 204, 51, 0.8)', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white font-bold leading-tight">Ishlab chiqarish jarayoni haqida videolavha.</p>
        <motion.button 
          className="text-white cursor-pointer font-bold bg-transparent border-none"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          Batafsil &gt;
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Section3() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Анимации для абстрактных элементов
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-15, 0]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [15, 0]);

  // Анимации для карточек
  const card1Y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const card3X = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <div className='section-3 py-16 p-10 sm:px-32 lg:px-2 bg-white relative overflow-hidden' ref={sectionRef}>
      {/* Левый абстрактный элемент */}
      <motion.div 
        className='absolute max-w-[550px] xl:max-w-[650px] 2xl:max-w-[850px] w-full z-0 top-1/2 -translate-y-1/2 -left-[380px] sm:-left-[420px] md:-left-[400px] xl:-left-[440px] 2xl:-left-[650px]'
        style={{
          x: leftX,
          opacity,
          rotate: rotateLeft,
          transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)'
        }}
      >
        <Image src={leftabastrack} alt="Left Abstract" className='w-full h-auto' />
      </motion.div>

      {/* Правый абстрактный элемент */}
      <motion.div 
        className='absolute max-w-[550px] xl:max-w-[650px] 2xl:max-w-[850px] w-full z-0 -bottom-[6%] sm:bottom-0 -right-[280px] sm:-right-[340px] md:-right-[363px] xl:-right-[440px] 2xl:-right-[560px]'
        style={{
          x: rightX,
          opacity,
          rotate: rotateRight,
          transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)'
        }}
      >
        <Image src={rightabastrack1} alt="Right Abstract" className='w-full h-auto' />
      </motion.div>

      <div className="container relative z-10 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Левая колонка */}
          <div className="flex flex-col gap-6 w-full lg:w-[60%] mx-auto">
            {/* Верхняя карточка */}
            <motion.div 
              className="bg-orange-200 rounded-[60px] h-[440px] w-full relative overflow-hidden p-0"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ scale: 0.99 }}
            >
              <Image className="w-full h-full object-cover rounded-[60px]" src={section3photo1} alt="section3photo1" fill />
              
              <motion.div 
                className="absolute left-12 top-10 z-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="md:text-[64px] text-[44px] font-extrabold text-[#a8491c] leading-[1.1] drop-shadow-md">
                  Barchasi<br/>yoz uchun!
                </h3>
              </motion.div>
              
              <motion.div 
                className="absolute left-0 md:text-lg lg:text-xl bottom-0 w-full flex justify-between items-center md:px-8 px-4 py-5"
                style={{ background: '#d35400', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white font-bold leading-tight">
                  Yangi mavsum uchun ta'mni kuchaytirdik!<br/>
                  Ikki karra ko'proq chanqoqlikni qondiruvchi ingredientlar...
                </p>
                <motion.button 
                  className="text-white cursor-pointer font-bold bg-transparent border-none"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Batafsil &gt;
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Нижняя карточка (видео) */}
            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Section3Video />
            </motion.div>
          </div>
          
          {/* Правая колонка */}
          <motion.div 
            className="w-full lg:w-[40%] mx-auto"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div 
              className="bg-green-700 rounded-[60px] h-[83%] flex flex-col justify-between text-white"
              whileHover={{ scale: 0.99 }}
            >
              <Image 
                className="rounded-t-[60px] w-full h-full object-cover" 
                src={section3photo3} 
                alt="section3photo1" 
              />
              
              <motion.div 
                className="flex justify-between md:text-lg lg:text-xl bg-[#2ecc71] md:p-6 px-4 py-5 rounded-b-[60px]"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className='ml-4 text-white font-bold leading-tight'>
                  Bog'dan yangi uzilgandek! <br/>
                  Nash sad endi yangicha ko'rinishda.
                </p>
                <motion.button 
                  className="text-white cursor-pointer font-bold"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Batafsil &gt;
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}