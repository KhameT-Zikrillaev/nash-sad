
'use client'
import React, { useState, useEffect } from 'react';
import CircleCard from '../../components/Cards/CircleCard';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';
export default function Section4() {
  const [apiData, setApiData] = useState([]);
  const { t } = useTranslation();
  // Индекс центра волны
  const fetchLinks = async () => {
    try {
      const response = await api.get('/links');
      if (response?.data) {
        setApiData(response?.data);
        console.log('Категории:', response?.data);
      }
    } catch (err) {
      console.error('Ошибка при запросе к /category:', err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);
  const centerIdx = Math.floor(apiData.length / 2);
  return (
    <>
    
    <div className="section-4 relative z-20 mt-[30px] pt-6 pb-2 bg-[#32ba4e]">
      <h1 className="text-2xl md:text-4xl uppercase font-semibold text-center mb-8 text-white">
        {t('section4.title')} <span className="text-lime-200 font-bold">{t('section4.title2')}</span>
      </h1>
      <div className="mx-auto  relative ">

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ контейнер кнопка~~~~~~~~~~~~~~~~~~~~~~~~~ */}
 
 <button className="cursor-pointer custom-swiper-prev bg-white rounded-full absolute left-[22%] sm:left-[28%] md:left-[31%] lg:left-[30%] xl:left-[22%] top-1/2 -translate-y-1/2 z-50" aria-label="Previous">
    <svg className='w-8 h-8 sm:w-12 sm:h-12' fill="none" stroke="#32ba4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  </button>
  <button className="cursor-pointer custom-swiper-next bg-white rounded-full absolute right-[22%] sm:right-[28%] md:right-[30%] lg:right-[32%] xl:right-[24%] top-1/2 -translate-y-1/2 z-50" aria-label="Next">
    <svg className='w-8 h-8 sm:w-12 sm:h-12' fill="none" stroke="#32ba4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 6l6 6-6 6" />
    </svg>
  </button>
<Swiper
  modules={[Navigation]}
  navigation={{
    nextEl: '.custom-swiper-next',
    prevEl: '.custom-swiper-prev',
  }}
  centeredSlides={true}
  spaceBetween={24}
  slidesPerView={2.2}
  loop={true}
  breakpoints={{
    480:  { slidesPerView: 3.0, spaceBetween: 24 },
    640:  { slidesPerView: 3.0, spaceBetween: 36 },
    768:  { slidesPerView: 3.0, spaceBetween: 24 },
    900:  { slidesPerView: 3.2, spaceBetween: 72 },
    1200: { slidesPerView: 4.2, spaceBetween: 32 },
    1440: { slidesPerView: 6.0, spaceBetween: 32 },
  }}
  className="pb-8 overflow-visible"
>
          {apiData.map((img, idx) => (
            <SwiperSlide key={idx} className="">
              <div className='w-full h-full py-12 flex justify-center items-center'>
                <motion.div
                  initial={{ opacity: 0, x: -80, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30, delay: Math.abs(idx - centerIdx) * 0.13 }}
                  style={{ width: '100%', height: '100%' }}
                >
                   <a href ={img?.link} target="_blank">
                  <CircleCard image={img?.imageUrl} />
                  </a>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Соцсети */}
      <div className="flex justify-center items-center gap-6 mt-8">
        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
           className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[white] transition-colors duration-300"/>
          </svg>
        </a>
    
        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
           className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[white] transition-colors duration-300"/>
            <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22768 13.4229 8.09402 12.5922C7.96035 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45414 8.79374 10.2009 8.40624C10.9477 8.01874 11.7977 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12853C15.4785 9.7356 15.8741 10.5214 16 11.37Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[white] transition-colors duration-300"/>
            <path d="M17.5 6.5H17.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[white] transition-colors duration-300"/>
          </svg>
        </a>
        
        {/* Telegram */}
        <a href="https://t.me" target="_blank" rel="noopener noreferrer"
           className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5L2 12.5L9 14.5M21 5L18 20L9 14.5M21 5L9 14.5M9 14.5V19L12.2498 16.125" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[white] transition-colors duration-300"/>
          </svg>
        </a>
      </div>
 
    </div>

    
    <div className="relative w-full  h-[420px] overflow-hidden">
      
        {/* ~~~~~~~~~~~~~~~абстрак снизу~~~~~~ */}
        {/* Белый фон с зелёной волной сверху, как на фото */}
        <div className="absolute z-20 top-0 left-0 w-full  bg-transparent"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute z-20  md:-top-[30px]  lg:-top-[60px] left-0 w-full">
          <path fill="#32ba4e" d="M0,300 C480,0 960,0 1440,300 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
    </>
  );
}

