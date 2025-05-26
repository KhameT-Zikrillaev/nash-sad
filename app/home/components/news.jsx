'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import news from '@/public/images/news1.png';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import sokabstrack from '@/public/images/sokabstrack.webp'

const UltraNewsPage = () => {
  // Данные новостей
  const newsItems = [
    {
      id: 1,
      title: "SO'Kda inqilob! Kelajak sport zali",
      description: "Biz VR-trenirovkalar, biometrik skanerlash va aqlli trenajyorlarga ega innovatsion sport majmuasini ishga tushiryapmiz.",
      date: "2025-yil 26-may",
      image: news,
      tags: ["Yangi", "Trend"]
    },
    {
      id: 2,
      title: "“Yashil marafon” 15-iyunda start oladi",
      description: "Qo‘shimcha reallik texnologiyalari bilan ekologik yugurish. Har bir kilometr — yangi virtual sarguzasht!",
      date: "2025-yil 15-iyun",
      image: news,
      tags: ["Tadbir", "Yugurish"]
    },
    {
      id: 3,
      title: "Bizning majmuada kibersport turniri",
      description: "SO'K tarixida birinchi bor: professional arenalarda 500 000₽ mukofot jamg‘armasi bilan kibersport musobaqalari.",
      date: "2025-yil 30-iyul",
      image: news,
      tags: ["Kibersport", "Turnir"]
    }
  ];

  // Refs и хуки для анимаций
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);



  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
      rotate: -5
    },
    onscreen: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };



  return (
    <div  className="relative  overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Анимированный фон */}
      <motion.div 
        className="absolute top-0 left-0 w-[200%] h-full bg-repeat-x"
      />

      {/* Основной контент */}
      <motion.section 
        ref={containerRef}
        style={{ y }}
        className="relative z-10 pt-4 md:pt-16 pb-2 md:pb-20 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          {/* Заголовок */}
           <h1 className="text-center text-4xl font-bold text-green-800 mb-4">Yangiliklar</h1>

          {/* Карточки новостей */}
          <div className="grid gap-4 md:gap-8">
            {newsItems.map((item) => (
              <motion.div
                key={item.id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 0.5 }}
                variants={cardVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#32ba4e] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl z-0" />

                <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="md:flex">
                    {/* Изображение новости */}
                    <motion.div 
                      className="md:w-1/4 relative overflow-hidden"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="md:max-w-[400px] w-full h-full object-cover"
                      />
                      {/* Теги */}
                      <div className="absolute bottom-4 left-6 flex gap-2">
                        {item.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="px-3 py-1 bg-[#32ba4e] text-white text-xs font-bold rounded-full shadow-lg"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Контент новости */}
                    <div className="md:w-1/1 p-8 relative">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-[#32ba4e] font-semibold mb-2 flex items-center"
                      >
                        {item.date}
                        <span className="mx-2">•</span>
                        <motion.span 
                          className="w-2 h-2 bg-[#32ba4e] rounded-full inline-block mr-1"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                        <span>Live</span>
                      </motion.div>

                      <motion.h2 
                        className="text-2xl font-bold text-gray-900 mb-4 relative z-50"
                        whileHover={{ color: '#32ba4e' }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.title}
                      </motion.h2>

                      <motion.p 
                        className="text-gray-600 mb-6 max-w-[60%] w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {item.description}
                      </motion.p>

                      {/* Кнопка */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                      >
                        <div className="relative z-50">
                          <button className="px-8 py-3 bg-gradient-to-r from-[#32ba4e] to-[#2aa441] text-white font-bold rounded-lg shadow-lg relative overflow-hidden group">
                            <span className="relative z-10">Узнать детально звоните!</span>
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-[#2aa441] to-[#32ba4e] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '0%' }}
                              transition={{ duration: 0.4 }}
                            />
                          </button>
                          <motion.div
                            className="absolute -bottom-1 left-0 h-1 bg-[#32ba4e] rounded-full"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </motion.div>

                      {/* Анимированное изображение справа */}
                      <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute bottom-0 right-0 w-[200px]"
                      >
                        <Image 
                          src={sokabstrack} 
                          alt="sokabstrack" 
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Декоративный элемент */}
                <motion.div
                  className="absolute -z-10 w-32 h-32 bg-[#32ba4e] rounded-full blur-3xl opacity-20 top-1/2 left-1/2"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Блок будущих новостей */}
          <div id="future-news" className="mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Следите за обновлениями!</h3>
              <div className="inline-flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-[#32ba4e] border-t-transparent rounded-full mr-3"
                />
                <span className="text-gray-600">Новые события появляются здесь автоматически</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default UltraNewsPage;