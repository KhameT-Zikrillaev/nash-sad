
'use client'
import React from 'react';
import CircleCard from '../../components/Cards/CircleCard';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import swiperphoto1 from '@/public/images/swiperphoto1.png';
import swiperphoto2 from '@/public/images/swiperphoto2.png';
import swiperphoto3 from '@/public/images/swiperphoto3.png';
import swiperphoto4 from '@/public/images/swiperphoto4.png';
import swiperphoto5 from '@/public/images/swiperphoto5.png';
import swiperphoto6 from '@/public/images/swiperphoto6.png';
export default function Section4() {
  const images = [swiperphoto3, swiperphoto4, swiperphoto5, swiperphoto1, swiperphoto2, swiperphoto6, swiperphoto3, swiperphoto4, swiperphoto5, swiperphoto1, swiperphoto6, swiperphoto2];
  // Индекс центра волны
  const centerIdx = Math.floor(images.length / 2);
  return (
    <>
    
    <div className="section-4 relative z-50 mt-[30px] py-10 bg-[#32ba4e]">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-white">
        Bizni ijtimoiy tarmoqlarda kuzatib boring <span className="text-lime-200">@NASH.SAD.UZ</span>
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
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="">
              <div className='w-full h-full py-12 flex justify-center items-center'>
                <motion.div
                  initial={{ opacity: 0, x: -80, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30, delay: Math.abs(idx - centerIdx) * 0.13 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <CircleCard image={img} />
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Соцсети */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
           className="group rounded-full bg-gradient-to-br from-lime-300 via-white/80 to-lime-400 shadow-lg w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_8px_rgba(190,242,100,0.7)]">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="text-blue-600 group-hover:text-blue-400 transition-colors duration-300"><path d="M22.675 0h-21.35C.595 0 0 .6 0 1.326v21.348C0 23.4.595 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.462.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.6 1.324-1.326V1.326C24 .6 23.405 0 22.675 0"/></svg>
        </a>
        {/* Линия */}
        <div className="w-8 h-0.5 bg-gradient-to-r from-lime-300 via-white to-lime-400 opacity-70 mx-1 rounded-full" />
        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
           className="group rounded-full bg-gradient-to-br from-pink-300 via-white/80 to-pink-400 shadow-lg w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_8px_rgba(244,114,182,0.7)]">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="text-pink-600 group-hover:text-pink-400 transition-colors duration-300"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.324.974.974 1.262 2.241 1.324 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.324 3.608-.974.974-2.241 1.262-3.608 1.324-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.324-.974-.974-1.262-2.241-1.324-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.324-3.608C4.531 2.583 5.798 2.295 7.164 2.233 8.43 2.175 8.81 2.163 12 2.163zm0-2.163C8.736 0 8.332.012 7.052.07 5.77.127 4.658.36 3.6 1.418 2.542 2.476 2.309 3.588 2.252 4.87 2.194 6.15 2.183 6.554 2.183 12c0 5.447.012 5.85.07 7.13.057 1.282.29 2.394 1.348 3.452 1.058 1.058 2.17 1.291 3.452 1.348 1.28.058 1.684.07 7.13.07s5.85-.012 7.13-.07c1.282-.057 2.394-.29 3.452-1.348 1.058-1.058 1.291-2.17 1.348-3.452.058-1.28.07-1.684.07-7.13s-.012-5.85-.07-7.13c-.057-1.282-.29-2.394-1.348-3.452C19.394.36 18.282.127 17 .07 15.72.012 15.316 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
        </a>
        {/* Линия */}
        <div className="w-8 h-0.5 bg-gradient-to-r from-pink-300 via-white to-pink-400 opacity-70 mx-1 rounded-full" />
        {/* Telegram */}
        <a href="https://t.me" target="_blank" rel="noopener noreferrer"
           className="group rounded-full bg-gradient-to-br from-sky-300 via-white/80 to-sky-400 shadow-lg w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_8px_rgba(56,189,248,0.7)]">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="text-sky-600 group-hover:text-sky-400 transition-colors duration-300"><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm5.707 8.293l-2.828 9.899c-.194.68-.542.85-1.09.53l-3.025-2.226-1.46 1.404c-.16.16-.295.295-.605.295l.22-3.084 5.617-5.077c.244-.217-.053-.338-.38-.121l-6.94 4.36-2.99-.934c-.65-.2-.663-.65.136-.96l11.664-4.5c.54-.2 1.013.13.84.96z"/></svg>
        </a>
      </div>
 
    </div>

    
    <div className="relative w-full  h-[420px] overflow-hidden">
      
        {/* ~~~~~~~~~~~~~~~абстрак снизу~~~~~~ */}
        {/* Белый фон с зелёной волной сверху, как на фото */}
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-transparent"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute z-50 top-0 left-0 w-full">
          <path fill="#32ba4e" d="M0,300 C480,0 960,0 1440,300 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
    </>
  );
}

