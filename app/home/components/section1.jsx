'use client'

import { motion } from 'framer-motion';
import Image from "next/image";
import styles from './section1.module.css'
import { useState, useEffect } from 'react';
import api from '@/lib/api';
export default function Section1() {
  // Состояние для хранения загруженных изображений
const [images, setImages] = useState([]);

// Загрузка изображений при монтировании компонента
useEffect(() => {
  const fetchImages = async () => {
    try {
      const response = await api.get('/intros');
      console.log(response.data);
      setImages(response?.data || []);
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error);
      // Можно добавить уведомление об ошибке
    }
  };
  
  fetchImages();
}, []);

// Состояние для активного слайда и прогресса анимации
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Функция для смены слайда
  const goToSlide = (index) => {
    setActiveSlide(index);
    setProgress(0);
  };

  // Анимация прогресса и переключение слайдов
  useEffect(() => {
    let startTime;
    let animationFrameId;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const duration = 4000; // 4 секунды на анимацию
      
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Переключение на следующий слайд по завершении анимации
        setActiveSlide(prev => (prev + 1) % images.length);
        setProgress(0);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSlide, images.length]);


  // Состояние загрузки фоновой картинки и задержки
  const [bgLoaded, setBgLoaded] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Запускаем задержку перед анимацией
  useEffect(() => {
    if (bgLoaded) {
      const timer = setTimeout(() => {
        setAnimationStarted(true);
      }, 1000); // Уменьшили задержку до 1 секунды

      return () => clearTimeout(timer);
    }
  }, [bgLoaded]);

  return (
    <section className="w-full flex relative top-[100px] sm:top-[0px] justify-center items-end bg-white h-[300px] sm:h-[420px]  xl:h-[570px] ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={bgLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <div className={`relative w-full -top-[100px] sm:-top-[0px] h-[300px] sm:h-[400px] xl:h-[570px] overflow-hidden flex justify-center items-end ${styles.sectionClip}`}>
          <motion.div
            initial={{ 
              clipPath: 'circle(0% at 50% 0)',
              transformOrigin: 'center top',
              transformBox: 'fill-box'
            }}
            animate={animationStarted ? { 
              clipPath: 'circle(150% at 50% 0)'
            } : { 
              clipPath: 'circle(0% at 50% 0)'
            }}
            transition={{ 
              duration: 1.2, // Уменьшаем длительность анимации
              ease: [0.25, 0.46, 0.45, 0.94],
              type: 'tween'
            }}
            style={{ 
              position: 'absolute', 
              inset: 0,
              overflow: 'hidden'
            }}
          >
            {(images || []).map((img, index) => (
              <motion.div
                key={img?.id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                {img?.imageUrl && (
                  <Image
                    src={img.imageUrl}
                    alt={`Slide ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={index < 2}
                    onLoadingComplete={() => index === 0 && setBgLoaded?.(true)}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
          {/* <div className={styles.shadowBottomEllipse}></div> */}
 
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ линия 4 для свипер~~~~~~~~~~~~~~~~~~~~~~~~ */}
       <motion.div 
  className='container w-full h-[500px]  -bottom-[150px] sm:-bottom-[130px]  xl:-bottom-[170px] relative z-50 flex justify-center items-end pb-4'
  initial={{ opacity: 0}}
  animate={{ opacity: 1 }}
  transition={{ 
    delay: 3,
    duration: 1
  }}
>


  
<div className=' w-full  '>

<div className="flex gap-2  h-[300px]  justify-center    px-[50px] sm:px-[160px]   md:px-[150px] mt-[120px] md:mt-[120px] sm:mt-[130px] md:mt-[120px] lg:mt-[50px] xl:mt-[20px]  2xl:mt-[50px]  w-full  absolute top-0 left-0  items-center">
  {/* Линия 1 */}
  <svg width="24%" height="auto" viewBox="0 0 1000 300" className="rotate-180" onClick={() => goToSlide(0)}>
    <defs>
      <linearGradient id="gradient1" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset={activeSlide === 0 ? progress : '100%'} stopColor="#FF8C00" />
        <stop offset={activeSlide === 0 ? progress : '100%'} stopColor={activeSlide > 0 ? "#ccc" : "#ccc"} />
      </linearGradient>
    </defs>
    <path
      d="M 50 -230 C 750 0, 750 50, 900 110"
      fill="none"
      stroke={
        activeSlide > 0 ? "#ccc" : 
        activeSlide === 0 ? "url(#gradient1)" : "#ccc"
      }
      strokeWidth="32"
      strokeLinecap="round"
    />
  </svg>
  
  {/* Линия 2 */}
  <svg width="24%" height="auto" viewBox="0 0 1000 280" className="rotate-180 mt-[5%]" onClick={() => goToSlide(1)}>
    <defs>
      <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset={activeSlide === 1 ? progress : '100%'} stopColor="#FF8C00" />
        <stop offset={activeSlide === 1 ? progress : '100%'} stopColor={activeSlide > 1 ? "#ccc" : "#ccc"} />
      </linearGradient>
    </defs>
    <path 
      d="M -300 -280 C 20 -330, 750 -250, 900 -190" 
      fill="none" 
      stroke={
        activeSlide > 1 ? "#ccc" : 
        activeSlide === 1 ? "url(#gradient2)" : "#ccc"
      }
      strokeWidth="32" 
      strokeLinecap="round" 
    />
  </svg>
  
  {/* Линия 3 */}
  <svg width="24%" height="auto" viewBox="0 0 1000 280" className="rotate-180 mt-[5%]" onClick={() => goToSlide(2)}>
    <defs>
      <linearGradient id="gradient3" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset={activeSlide === 2 ? progress : '100%'} stopColor="#FF8C00" />
        <stop offset={activeSlide === 2 ? progress : '100%'} stopColor={activeSlide > 2 ? "#ccc" : "#ccc"} />
      </linearGradient>
    </defs>
    <path 
      d="M -190 -100 C 20 -280, 750 -300, 900 -300" 
      fill="none" 
      stroke={
        activeSlide > 2 ? "#ccc" : 
        activeSlide === 2 ? "url(#gradient3)" : "#ccc"
      }
      strokeWidth="32" 
      strokeLinecap="round" 
    />
  </svg>
  
  {/* Линия 4 */}
  <svg width="24%" height="auto" viewBox="0 0 1000 300" className="rotate-180 ml-2" onClick={() => goToSlide(3)}>
    <defs>
      <linearGradient id="gradient4" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset={activeSlide === 3 ? progress : '100%'} stopColor="#FF8C00" />
        <stop offset={activeSlide === 3 ? progress : '100%'} stopColor="#ccc" />
      </linearGradient>
    </defs>
    <path
      d="M 900 -250 C 110 0, 200 50, -110 130"
      fill="none"
      stroke={
        activeSlide === 3 ? "url(#gradient4)" : "#ccc"
      }
      strokeWidth="32"
      strokeLinecap="round"
    />
  </svg>
  
</div>

</div>
       </motion.div>

        </div>
      </motion.div>
    </section>
  );
}