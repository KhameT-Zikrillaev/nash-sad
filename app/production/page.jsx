
'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
 import api from '@/lib/api';
const AnimatedCounter = ({ value, duration = 2, decimalPlaces = 0 }) => {
  const [count, setCount] = useState(0);
 
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = parseFloat(value);
    const increment = end / (duration * 60); // 60 кадров в секунду
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000/60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  // Округляем до целого числа, если decimalPlaces = 0, иначе оставляем нужное количество знаков
  const displayValue = decimalPlaces > 0 
    ? count.toFixed(decimalPlaces)
    : Math.round(count);
    
  return (
    <span ref={ref}>
      {displayValue}
    </span>
  );
};

export default function Production() {
  const { t, i18n } = useTranslation();
  const [productions, setProductions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Получаем текущий язык
  const currentLang = i18n.language || 'uz';
  
  // Функция для получения локализованного поля
  const getLocalizedField = (field, item) => {
    const fieldName = `${field}${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
    return item[fieldName] || item[`${field}Uz`] || ''; // Возвращаем на узбекском, если перевод не найден
  };

  useEffect(() => {
    const fetchDataProduction = async () => {
      try {
        const response = await api.get('/productions');
        if (response?.data) {
          setProductions(response.data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataProduction();
  }, [currentLang]); // Добавляем currentLang в зависимости

  
  return (
    <div className='ProductionPage max-w-[1920px] w-full mx-auto mt-[15%] relative overflow-hidden md:mt-[100px] lg:mt-[120px] xl:mt-[100px]'>
      <div className="container">
        {/* ~~~~~~~~~~~~~~~~static number content */}
        <div className="static-content flex gap-10 md:gap-0 flex-wrap max-w-[700px] w-full mx-auto justify-center md:justify-between items-center">
          {/* ~~~~~~~~~~~~~~~~~~~~1 */}
          <motion.div 
            className="flex items-center md:gap-2 gap-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="md:text-6xl text-2xl font-bold text-green-600">
              <AnimatedCounter value={5.5} decimalPlaces={1} /> <span className="block md:text-xl text-lg font-semibold">{t('production.area')}</span>
            </h3>
            <p className="text-gray-600 leading-[1.2] w-[100px]">{t('production.production_area')}</p>
          </motion.div>
          {/* ~~~~~~~~~~~~~~~~~~~~2 */}
          <motion.div 
            className="flex items-center md:gap-2 gap-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="md:text-6xl text-3xl font-bold text-green-600">
              <AnimatedCounter value={3} /> <span className="block md:text-xl text-lg font-semibold">{t('production.unit')}</span>
            </h3>
            <p className="text-gray-600 leading-[1.2] w-[100px]">{t('production.large_complexes')}</p>
          </motion.div>
          {/* ~~~~~~~~~~~~~~~~~~~~3 */}
          <motion.div 
            className="flex items-center md:gap-2 gap-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="md:text-6xl text-3xl font-bold text-green-600">
              <AnimatedCounter value={20} /><span className="block md:text-xl text-lg font-semibold">{t('production.over')}</span>
            </h3>
            <p className="text-gray-600 leading-[1.2] w-[100px]">{t('production.product_types')}</p>
          </motion.div>
        </div>
        
        {/* ~~~~~~~~~~~~~~~~movie content */}
        <div className="movie-content mt-4 w-full max-w-4xl mx-auto aspect-video">
          <iframe 
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
        
        {/* ~~~~~~~~~~~~~~~~article content */}
        <article className="article-content max-w-5xl leading-[1.5] tracking-wider w-full mx-auto text-lg md:text-xl bg-[#f0fdf4] p-2 md:p-6 rounded-xl mt-8">
          <p>{t('production.content.p1')}</p>
          <br/>
          <p>{t('production.content.p2')}</p>
          <ul className='flex flex-col gap-1 md:gap-2 mt-2 md:mt-4 list-disc pl-6'>
            <li>{t('production.content.li1')}</li>
            <li>{t('production.content.li2')}</li>
            <li>{t('production.content.li3')}</li>
            <li>{t('production.content.li4')}</li>
          </ul>
        </article>
      </div>
      
      {/* ~~~~~~~~~~~~~~~~Marquee content */}
      <div className='marquee-content mt-12 w-full mx-auto max-w-[1920px]'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center'>{t('production.manufacturing_process')}</h2>
        <Marquee 
          speed={30} 
          gradient={true}
          gradientWidth={100}
          pauseOnHover={true}
          className='py-4'
          style={{
            width: '100%',
            overflow: 'hidden'
          }}
        >
          {productions?.map((item) => (
            <div key={item.id} className='mx-4 w-[250px] md:w-[400px] h-[150px] md:h-[250px] relative'>
              <Image 
                src={item?.imageUrl} 
                alt={'productions'} 
                fill
                className='object-cover rounded-lg'
              />
            </div>
          ))}
        </Marquee>
      </div>
    <h4 className='text-2xl md:text-3xl font-bold text-green-600 mb-6 text-center'>{t('production.achievements_certificates')}</h4>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~swiper content~~~~~~~~~~~~~~~~~~~~ */}
      <div className="mt-12 max-w-[1000px] px-[100px] mx-auto px-4 relative">
        <Swiper
          modules={[ Navigation, Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            renderBullet: function (index, className) {
              return '<span class="' + className + ' inline-block !w-3 !h-3 mx-1 rounded-full bg-gray-300 transition-all duration-300"></span>';
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="relative"
       
        >
          {isLoading ? (
            <SwiperSlide className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </SwiperSlide>
          ) : productions.length > 0 ? (
            productions.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto pb-16">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Изображение слева */}
                  <div className="w-full md:w-1/2 h-[300px] relative rounded-xl overflow-hidden">
                    <Image
                      src={item?.imageUrl}
                      alt={getLocalizedField('title', item) || 'Production image'}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Текст справа */}
                  <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-2xl md:text-3xl text-gray-800 font-bold mb-4">
                      {getLocalizedField('title', item)}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {getLocalizedField('description', item)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="text-center py-12">
              <p className="text-gray-500">{t('production.noData')}</p>
            </SwiperSlide>
          )}
          
          {/* Индикаторы */}
          <div className="
  swiper-pagination
  !absolute
  !bottom-[30px]
  !left-1/2              
  !-translate-x-1/2      
  md:!left-[150px]       
  md:!translate-x-0      
  lg:!left-[160px]
  xl:!left-[175px]
  !w-auto                
  flex justify-center    
  gap-2                  
"></div>
        </Swiper>
        
        {/* Кнопка прев */}
        <button 
  className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-transparent hover:bg-green-50 rounded-full transition-all duration-300 hover:scale-110"
>
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>

{/* ... */}

{/* Кнопка некст */}
<button 
  className="swiper-button-next absolute    right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-transparent hover:bg-green-50 rounded-full transition-all duration-300 hover:scale-110"
>
  <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>
      </div>
    </div>
  );
}
