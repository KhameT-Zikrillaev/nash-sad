'use client'

import { motion } from 'framer-motion';
import Image from "next/image";
import bg from '@/public/images/bg.webp'
import logoabstrack from '@/public/images/logoabstrack.webp'
import topabstrack from '@/public/images/topabstrack.webp'
import bottomabstrack from '@/public/images/bottomabstrack.webp'
import leftabstrack from '@/public/images/leftabstrack.webp'
import rightabstrack from '@/public/images/rightabstrack.webp'
import textabstrack from '@/public/images/textabstrack.webp'
import sokabstrack from '@/public/images/sokabstrack.webp'
import styles from './section1.module.css'

import { useState, useEffect } from 'react';

export default function Section1() {
  // Настройки жесткой пружины для "дергания"
  const [pathData, setPathData] = useState("M 100 230 C 350 130, 650 130, 900 230");
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPathData("M 100 230 C 350 100, 650 100, 900 230");
         
            } else {
                setPathData("M 100 230 C 350 130, 650 130, 900 230");
            }
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Инициализация
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  const aggressiveSpring = {
    type: "spring",
    stiffness: 300,
    damping: 15,
    velocity: 10
  };

  // Состояние загрузки фоновой картинки
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <section className="w-full flex   relative top-[100px] sm:top-[0px] justify-center items-end bg-white h-[300px] sm:h-[420px] xl:h-[500px] xl:h-[700px]" >
       <motion.div
          initial={{ y: -300, opacity: 0 }}
          animate={bgLoaded ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
      <div
        className={`relative  w-full -top-[100px] sm:-top-[0px] h-[300px] sm:h-[400px] xl:h-[500px] xl:h-[700px] overflow-hidden flex justify-center items-end ${styles.sectionClip}`}
      >
       
          <Image
            src={bg}
            alt="background"
            fill
            style={{objectFit: 'cover'}}
            priority
            onLoadingComplete={() => setBgLoaded(true)}
          />
          <div className={styles.shadowBottomEllipse}></div>
     
        
        {/* Анимированные элементы с дерганием */}
        <div className="absolute  inset-0 flex items-center justify-center z-20 pointer-events-none">
          {/* ~~~~~~~~~sok (резко вылетает снизу с тряской) ~~~~~~~~~~~~~ */}
          <motion.div
            className='absolute top-[19%] sm:top-[10.5%] left-[10%] md:top-[10%] xl:top-[15%] 2xl:top-[2.5%] z-[2] md:left-[17%] xl:left-[11.5%] max-w-[170px] sm:max-w-[260px] md:max-w-[260px] xl:max-w-[400px] 2xl:max-w-[450px] w-full'
            initial={{ y: 300, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              x: [0, -5, 5, -3, 3, 0] // Дрожание по X
            }}
            transition={{ 
              ...aggressiveSpring,
              delay: 0.8,
              x: { duration: 0.5, repeat: 1 }
            }}
          >
            <Image src={sokabstrack} alt="Sok Abstrack" />
          </motion.div>

          {/* ~~~~~~~~~text (падает с дрожанием) ~~~~~~~~~~~~~ */}
          <motion.div
            className='absolute top-[9%] right-[37%] sm:top-[10%] sm:right-[25%] md:top-[5%] 2xl:top-[8%] z-[2] md:right-[39%] xl:right-[50.5%] 2xl:right-[47.5%] max-w-[150px] sm:max-w-[220px] xl:max-w-[280px] 2xl:max-w-[370px] w-full'
            initial={{ y: -150, opacity: 0, rotate: -5 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              rotate: 0,
              scale: [1, 1.05, 1] // Легкий удар
            }}
            transition={{ 
              ...aggressiveSpring,
              delay: 1.0,
              scale: { duration: 0.3 }
            }}
          >
            <Image src={textabstrack} alt="Text Abstrack" />
          </motion.div>

          {/* ~~~~~~~~~top (выскакивает с резким масштабом) ~~~~~~~~~~~~~ */}
          <motion.div
            className='absolute top-[33%] right-[16%] sm:right-[23%] sm:top-[33%] md:top-[23%] xl:top-[10.5%] z-[2] md:right-[30%] xl:right-[27.5%] filter drop-shadow-[2px_21px_22px_rgba(0,0,0,0.6)] max-w-[140px] sm:max-w-[200px] xl:max-w-[370px] w-full'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: [0, 2, -2, 0] // Дрожание
            }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 15,
              delay: 1.2,
              rotate: { duration: 0.4 }
            }}
          >
            <Image src={topabstrack} alt="Top Abstrack" />
          </motion.div>

          {/* ~~~~~~~~~logo (мощная анимация с ударом и тряской) ~~~~~~~~~~~~~ */}
          <motion.div
            className='absolute top-[42.5%] right-[21%] sm:right-[29%] sm:top-[43%] md:top-[30%] xl:top-[20%] md:right-[32%] xl:right-[30%] z-[5] max-w-[90px] sm:max-w-[125px] md:max-w-[120px] xl:max-w-[250px] w-full'
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 5, -5, 0], // Жесткая тряска
              opacity: 1
            }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: 1.4,
              rotate: { 
                duration: 0.8,
                repeat: 0
              },
              scale: {
                duration: 0.6
              }
            }}
          >
            <Image src={logoabstrack} alt="Logo Abstrack" />
          </motion.div>

          {/* ~~~~~~~~~bottom (взрывное появление с поворотом) ~~~~~~~~~~~~~ */}
          <motion.div
            className='absolute -bottom-[17%] right-[15%] sm:-bottom-[18%] sm:right-[21%] md:-bottom-[12%] z-[3] md:right-[25.5%] max-w-[150px] sm:max-w-[220px] md:max-w-[250px] xl:max-w-[440px] w-full'
            initial={{ rotate: 90, opacity: 0, y: 100 }}
            animate={{ 
              rotate: 0, 
              opacity: 1,
              y: 0,
              x: [0, 4, -4, 2, -2, 0] // Боковая тряска
            }}
            transition={{ 
              type: "spring",
              stiffness: 350,
              damping: 15,
              delay: 1.6,
              x: { duration: 0.6 }
            }}
          >
            <Image src={bottomabstrack} alt="Bottom Abstrack" />
          </motion.div>

          {/* ~~~~~~~~~left (резкий вылет с отскоком) ~~~~~~~~~~~~~ */}
          <motion.div
            className='absolute bottom-[7%] right-[30%] sm:bottom-[13%] sm:right-[43%] md:bottom-[20%] xl:bottom-[18%] z-[1] md:right-[42%] xl:right-[41.5%] max-w-[110px] sm:max-w-[130px] md:max-w-[140px] xl:max-w-[330px] w-full'
            initial={{ x: 100, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: [0, -10, 10, -5, 5, 0] // Вертикальная тряска
            }}
            transition={{ 
              ...aggressiveSpring,
              delay: 1.8,
              y: { duration: 0.7 }
            }}
          >
            <Image src={leftabstrack} alt="Left Abstrack" />
          </motion.div>

          {/* ~~~~~~~~~right (резкий вылет + вибрация) ~~~~~~~~~~~~~ */}
          <motion.div
            className='absolute bottom-[14%] right-[9%] sm:bottom-[15%] sm:right-[13%] md:bottom-[22%] xl:bottom-[25%] z-[1] md:right-[20%] xl:right-[17%] max-w-[130px] sm:max-w-[220px] md:max_w-[250px] xl:max-w-[440px] w-full'
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              scale: 1,
              rotate: [0, 3, -3, 0] // Дрожание
            }}
            transition={{ 
              ...aggressiveSpring,
              delay: 2.0,
              rotate: { duration: 0.5 }
            }}
          >
            <Image src={rightabstrack} alt="Right Abstrack" />
          </motion.div>
        </div>

        {/* <div className="relative z-10 w-full h-full flex justify-center items-end">
          
        </div> */}
             <motion.div 
      className='container w-full h-[400px] -bottom-[150px] sm:-bottom-[130px] md:-bottom-[120px] relative z-50'
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ 
        delay: 2, // Задержка 3 секунды
        duration: 1 // Длительность анимации 1 секунда
      }}
    >
      {/* Перевёрнутый SVG с длинными черными линиями */}
      <svg
        className="absolute left-0 top-0 w-full h-full rotate-180"
        viewBox="0 0 1000 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathData}
          stroke="#bdc3c7"
          strokeWidth="6"
          strokeDasharray="180 40"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
      </div>
      </motion.div>
    </section>
  );
}