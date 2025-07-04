'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import rightabastrack2 from '@/public/images/right-2-abstrack.webp';
import leftabstrack2 from '@/public/images/leftabstrack2.webp';
import api from '@/lib/api';

export default function Section2() {
  const sectionRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const { i18n } = useTranslation();
  const router = useRouter();
  
  // Получаем текущий язык
  const currentLang = i18n.language || 'uz';

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    router.push(`/products?category=${categoryId}`);
  };
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Функция для получения локализованного поля
  const getLocalizedField = (field, item) => {
    const fieldName = `${field}${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
    return item[fieldName] || item[`${field}Uz`] || ''; // Возвращаем на узбекском, если перевод не найден
  };

  // Анимации для абстрактных элементов
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [15, 0]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/category');
      console.log(response.data);
      if (response.data?.data) {
        // Добавляем локализованные поля в каждую категорию
        const categoriesWithLocalization = response.data.data.map(category => ({
          ...category,
          localizedTitle: getLocalizedField('title', category),
          localizedDescription: getLocalizedField('description', category)
        }));
        setCategories(categoriesWithLocalization);
      }
    } catch (err) {
      console.error('Ошибка при запросе к /category:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentLang]); // Обновляем при смене языка
  return (
    <div className='section-2 mt-2  px-2 sm:mt-[100px] relative' ref={sectionRef}>
        {/* right abstract */}
        <motion.div 
          className='absolute max-w-[350px] lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[850px] w-full -top-[25%] -right-[235px] sm:-top-[80%] md:-top-[80%] sm:-right-[235px] md:-right-[235px] lg:-top-[100%] lg:-right-[360px] xl:-top-[100%] xl:-right-[440px] 2xl:-right-[560px] z-0'
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
          className='absolute max-w-[120px] md:max-w-[150px] lg:max-w-[180px] xl:max-w-[200px] 2xl:max-w-[300px] w-full left-[5%]   top-[10%] sm:-top-[10%] xl:-top-[30%]'
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

        <div className="container w-full  md:py-12 py-4 relative flex justify-center items-center mt-10">
          <div className="w-full max-w-[1000px] mt-[60px] sm:mt-[30px] juice-animated-bg rounded-[48px] py-1 md:py-8 px-4 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-6">
            {categories.map((card, index) => (
              <motion.div 
                key={card.id}
                className="rounded-2xl -mt-[30px] flex sm:-mt-[120px] max-w-[300px] w-full xl:h-[300px] flex-col items-center justify-center group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                onClick={() => handleCategoryClick(card.id)}
              >
                <div className="max-w-[300px] flex flex-col justify-center items-center w-full xl:h-[300px]   relative p-4">
                  <div className="group-hover:-translate-y-2 transition-transform duration-300">
                    <Image
                      src={card?.imageUrl}
                      alt={card.titleUz}
                      className="max-w-[220px] w-full object-contain mb-4 transition-all duration-300 group-hover:drop-shadow-[0_12px_2px_rgba(0,0,0,0.3)]"
                      width={220}
                      height={220}
                    />
                  </div>
                  <p className='text-center px-4 text-white static md:absolute md:bottom-4 md:left-0 md:right-0 transition-all duration-300 transform md:-translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:bottom-[-2%] md:group-hover:opacity-100'>
                    {card.localizedTitle || card.titleUz} <br />
                    <span className="text-[14px]">{card.localizedDescription || card.descriptionUz}</span>
                  </p>
               
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  )
}