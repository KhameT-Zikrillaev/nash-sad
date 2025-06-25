'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import leftabastrack from '@/public/images/left-abstrack.webp';
import rightabastrack1 from '@/public/images/right-1-abstrack.webp';
import section3photo1 from '@/public/images/section3photo1.png';
import section3photo3 from '@/public/images/section3photo3.png';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';

// Добавляем глобальные стили для обрезки текста
const globalStyles = `
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~VIDEO~~~~~~~~~~~~~~~~~~~~~~
function Section3Video() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { t, i18n } = useTranslation();
  
  const handleBatafsilClick = (e) => {
    e.stopPropagation();
    router.push('/news');
  };

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
      className="bg-blue-100 rounded-[60px] md:h-[350px] h-[250px] w-full relative overflow-hidden p-0"
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
        className="absolute left-0  bottom-0 md:text-lg lg:text-xl w-full flex justify-between items-center md:px-8 px-4 py-5"
        style={{ background: 'rgba(153, 204, 51, 0.8)', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white w-full text-center  font-semibold leading-tight">{t('section3.videoTitle', 'Ishlab chiqarish jarayoni haqida videolavha.')}</p>
   
      </motion.div>
    </motion.div>
  );
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ cards~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default function Section3() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Получаем текущий язык
  const currentLang = i18n.language || 'uz';
  
  // Функция для получения локализованного поля
  const getLocalizedField = (field, item) => {
    const fieldName = `${field}${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
    return item[fieldName] || item[`${field}Uz`] || ''; // Возвращаем на узбекском, если перевод не найден
  };
  
  // Загрузка новостей
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        // Преобразуем данные из API в нужный формат
        const formattedData = (response.data?.data || [])
          .map(item => ({
            id: item.id,
            title: getLocalizedField('title', item),
            description: getLocalizedField('description', item),
            image: item.image,
            date: new Date(item.createdAt).toLocaleDateString('ru-RU'),
            ...item
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        console.log('News data loaded:', formattedData);
        setNews(formattedData);
      } catch (err) {
        console.error('Ошибка при загрузке новостей:', err);
        setError('Не удалось загрузить новости');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [currentLang]);

  const handleBatafsilClick = (e) => {
    e.preventDefault();
    router.push('/news');
  };

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
  // const card1Y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  // const card2Y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  // const card3X = useTransform(scrollYProgress, [0, 1], [200, 0]);

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className='section-3 p-4 sm:p-10 sm:px-32 lg:px-2 bg-white relative overflow-hidden' ref={sectionRef}>
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

      <div className=" max-w-[1000px]  w-full relative z-10 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Левая колонка */}
          <div className="flex flex-col gap-6 w-full lg:w-[60%] mx-auto">
            {/* Верхняя карточка с первой новостью */}
            {news.length > 0 && (
              <motion.div 
                className="bg-orange-200 rounded-[60px] md:h-[350px] h-[250px] w-full relative overflow-hidden p-0"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                whileHover={{ scale: 0.99 }}
                onClick={() => router.push(`/news/${news[0].id}`)}
              >
                <Image 
                  className="w-full h-full object-cover rounded-[60px]" 
                  src={news[0].image} 
                  alt={news[0].title} 
                  fill
                  priority
                />
                
                <motion.div 
                  className="absolute left-12 top-10 z-10"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="md:text-[64px] text-[44px] font-extrabold text-[#a8491c] leading-[1.1] drop-shadow-md">
                    {news[0].title.split(' ').slice(0, 2).join(' ')}<br/>{news[0].title.split(' ').slice(2).join(' ')}
                  </h3>
                </motion.div>
                
                <motion.div 
                  className="absolute left-0 md:text-lg lg:text-xl bottom-0 w-full flex justify-between items-center md:px-8 px-4 py-5"
                  style={{ background: '#d35400', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white font-semibold leading-tight line-clamp-2">
                    {news[0].description}
                  </p>
                  <motion.span 
                    className="text-white text-[16px] cursor-pointer font-semibold bg-transparent border-none"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {t('section3.More')}&gt;
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
            
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
          
          {/* Правая колонка со второй новостью */}
          {news.length > 1 && (
            <motion.div 
              className="w-full lg:w-[40%] mx-auto"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
           
           <motion.div 
              className="bg-green-700 rounded-[60px]  flex flex-col justify-between text-white"
              whileHover={{ scale: 0.99 }}
              onClick={() => router.push(`/news/${news[1].id}`)}
            >
             {news[1]?.image ? (
                <Image 
                  className="rounded-t-[60px] w-full h-[350px] md:h-full object-cover" 
                  src={news[1].image} 
                  alt={news[1].title || 'News image'}
                  width={500}
                  height={350}
                  onError={(e) => {
                    e.target.src = section3photo3.src;
                    e.target.onerror = null;
                  }}
                />
              ) : (
                <Image 
                  className="rounded-t-[60px] w-full h-[350px] md:h-full object-cover" 
                  src={section3photo3} 
                  alt="Default news image" 
                />
              )}
                
                <motion.div 
                  className="flex flex-col p-4 md:p-6 bg-[#2ecc71] rounded-b-[60px] flex-grow"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-white text-lg md:text-xl font-bold mb-2 line-clamp-2">
                    {news[1].title}
                  </h3>
                  <p className="text-white text-sm mb-3 line-clamp-2">
                    {news[1].description}
                  </p>
                  <motion.span 
                    className=" cursor-pointer text-white text-sm font-semibold inline-flex items-center hover:underline self-end"
                    whileHover={{ x: 5 }}
                  >
                    {t('section3.More')} &gt;
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}