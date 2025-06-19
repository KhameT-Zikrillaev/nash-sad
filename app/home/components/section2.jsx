'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import rightabastrack2 from '@/public/images/right-2-abstrack.webp';
import leftabstrack2 from '@/public/images/leftabstrack2.webp';
import api from '@/lib/api';

export default function Section2() {
  const sectionRef = useRef(null);
  const [categories, setCategories] = useState([]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Анимации для абстрактных элементов
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [15, 0]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/category');
      if (response.data?.data) {
        setCategories(response.data.data);
        console.log('Категории:', response.data.data);
      }
    } catch (err) {
      console.error('Ошибка при запросе к /category:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className='section-2 mt-2 px-2 sm:mt-[100px] relative' ref={sectionRef}>
        {/* right abstract */}
        <motion.div 
          className='absolute max-w-[350px] lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[850px] w-full -top-[15%] -right-[235px] sm:-top-[80%] md:-top-[80%] sm:-right-[235px] md:-right-[235px] lg:-top-[100%] lg:-right-[360px] xl:-top-[100%] xl:-right-[440px] 2xl:-right-[560px] z-0'
          style={{
            x: rightX,
            opacity,
            rotate: rotateRight,
            transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)'
          }}
        >
          <Image 
            src={rightabastrack2} 
            alt="Right Abstract" 
            className='w-full h-auto'
            priority
          />
        </motion.div>

        {/* left abstract */}
        <motion.div 
          className='absolute max-w-[120px] md:max-w-[150px] lg:max-w-[180px] xl:max-w-[200px] 2xl:max-w-[300px] w-full left-[5%]   top-[10%] sm:-top-[10%]'
          initial={{ y: -300, opacity: 0 }}
          animate={{ 
            y: [-300, -100, -120, -100],
            opacity: 1,
            rotate: [0, 5, -3, 0, 0]
          }}
          transition={{
            delay: 2, // 2 second delay before animation starts
            y: { 
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.7, 0.85, 1],
              delay: 2 // Delay for y movement
            },
            opacity: {
              duration: 0.1,
              delay: 2 // Delay for fade in
            },
            rotate: {
              duration: 1.5,
              times: [0, 0.3, 0.7, 0.9, 1],
              delay: 2.2 // Slightly later start for rotation
            }
          }}>
          <Image 
            src={leftabstrack2} 
            alt="Left Abstract" 
            className='w-full h-auto'
            priority
          />
        </motion.div>

        <div className="container w-full py-12 relative flex justify-center items-center mt-10">
          <div className="w-full max-w-[1000px] mt-[100px] sm:mt-[30px] juice-animated-bg rounded-[48px] py-8 px-4 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-6">
            {categories.map((card, index) => (
              <motion.div 
                key={card.id}
                className="rounded-2xl -mt-[30px] flex sm:-mt-[120px] max-w-[300px] w-full xl:h-[300px] flex-col items-center justify-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="max-w-[300px] flex flex-col justify-center items-center w-full xl:h-[300px]   relative p-4">
                  <div className="group-hover:-translate-y-2 transition-transform duration-300">
                    <Image
                      src={card?.imageUrl}
                      alt={card.titleUz}
                      className="max-w-[220px] w-full object-contain mb-4 transition-all duration-300 group-hover:drop-shadow-[5px_20px_10px_rgba(0,0,0,0.9)]"
                      width={220}
                      height={220}
                    />
                  </div>
                  <p className='text-center px-4 text-white static md:absolute md:bottom-4 md:left-0 md:right-0 transition-all duration-300 transform md:-translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:bottom-[-2%] md:group-hover:opacity-100'>
                    {card.titleUz} <br />
                    <span className="text-[14px]">  {card.descriptionUz}</span>
                  </p>
               
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  )
}