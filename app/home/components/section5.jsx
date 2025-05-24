'use client'
import Image from 'next/image';
import n from '@/public/images/logo/n.png'
import a from '@/public/images/logo/a.png'
import sh from '@/public/images/logo/sh.png'
import  s from '@/public/images/logo/s.png'
import a2 from '@/public/images/logo/a2.png'
import d from '@/public/images/logo/d.png'
import b from '@/public/images/logo/b.png'
import b2 from '@/public/images/logo/b2.png'
import React from 'react';

export default function Section5() {
    return (
        <>
         <div className='section-5 pt-[500px]'>
            <div className='container'>
                <div className='box w-[160px] mx-auto h-[160px] bg-[#d9f99d]  flex flex-col justify-center items-center border  -mt-[600px]'>
                    <div className='row-1 flex border'>
                <Image className='w-[45px] h-[50px]  mt-1 ' src={n} alt="logo" />
                <Image className='w-[40px] h-[40px] -ml-[7px] mt-2' src={a} alt="logo" />
                <Image className='w-[40px] h-[40px]  -ml-[5px]' src={sh} alt="logo" />
                </div>
                <div className='row-2 flex border -mt-2'>
                <Image className='w-[20px] h-[20px] -mr-[12px] mt-1 ' src={b} alt="logo" />
                <Image className='w-[40px] h-[40px]  mt-1 ' src={s} alt="logo" />
                <Image className='w-[40px] h-[40px] -ml-[7px] -mt-1' src={a2} alt="logo" />
                <Image className='w-[45px]   -ml-[10px] -mt-3 ' src={d} alt="logo" />
                <Image className='w-[20px] h-[20px] -ml-[11px] mt-1' src={b2} alt="logo" />
                    </div>
                </div>
            </div>
         </div>
        </>
    );
}


'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import photo1 from '@/public/images/250format.webp';
import photo2 from '@/public/images/125format.png';
import photo4 from '@/public/images/4block.png';
import rightabastrack2 from '@/public/images/right-2-abstrack.png';
import onesok from '@/public/images/onesok.png'
export default function Section2() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Анимация для абстрактного элемента
  const xPos = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [15, 0]);

  // Анимация для кубиков
  const cube1Y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const cube2Y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const cube4Y = useTransform(scrollYProgress, [0, 1], [-80, 0]);

  return (
    <>
      <div className='section-2 mt-2 px-2 sm:mt-[100px] relative' ref={sectionRef}>
        {/* Анимированный абстрактный элемент */}
        <motion.div 
          className='absolute max-w-[350px] lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[850px] w-full -top-[25%] -right-[235px] sm:-top-[80%] md:-top-[80%] sm:-right-[235px] md:-right-[235px] lg:-top-[100%] lg:-right-[360px] xl:-top-[140%] xl:-right-[440px] 2xl:-right-[560px]'
          style={{
            x: xPos,
            opacity,
            rotate,
            transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)'
          }}
        >
          <Image 
            src={rightabastrack2} 
            alt="Right Abstract" 
            className='w-full h-auto'
          />
        </motion.div>

        <div className="container w-full py-12 relative flex justify-center items-center mt-10">
          <motion.div 
            className="w-full mt-[100px] sm:mt-[30px] juice-animated-bg rounded-[48px] py-2 px-4 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Кубик 1 */}
            <motion.div 
              className=" rounded-2xl -mt-[30px] flex sm:-mt-[70px] max-w-[300px] w-full xl:h-[300px] h-[190px]  sm:h-[250px] flex-col items-center justify-center"
              style={{ y: cube1Y }}
            >
              
              <Image 
                className="max-w-[500px] w-full object-contain" 
                src={photo1} 
                alt="photo" 
              />
           
            </motion.div>

            {/* Кубик 2 (с фото и текстом) */}
            <motion.div 
              className="rounded-2xl flex flex-col max-w-[300px] w-full  xl:h-[300px] h-[190px]  sm:h-[250px] items-center justify-center"
              style={{ y: cube2Y }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className='max-w-[300px] flex items-center justify-center -mt-[70px] w-full relative'>
              <Image 
                src={photo1} 
                alt="photo"  
                className="max-w-[220px] w-full object-contain mb-2" 
              />
              </div>
              <motion.div 
                className="text-white text-center font-semibold leading-tight text-base xl:text-[26px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                SHARBAT VA<br />NEKTARLAR
              </motion.div>
              <motion.div 
                className="text-center text-white text-sm xl:text-lg mt-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Ixcham 250 ml qadoqda
              </motion.div>
            </motion.div>

            {/* Кубик 3 */}
            <motion.div 
              className=" -mt-[20px] sm:mt-[0px] rounded-2xl flex flex-col max-w-[300px] w-full xl:h-[300px] h-[190px]  sm:h-[250px]  items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Image 
                src={photo2} 
                className="  max-w-[120px] sm:max-w-[200px] md:max-w-[160px] w-full" 
                alt="photo"
              />
            </motion.div>

            {/* Кубик 4 */}
            <motion.div 
              className=" rounded-2xl flex flex-col items-center justify-center"
              style={{ y: cube4Y }}
              initial={{ opacity: 0, rotate: 10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className=" max-w-[300px]  mt-[30px] sm:-mt-[100px] w-full xl:h-[300px] h-[190px]  sm:h-[250px] relative">
             
              <Image 
                src={onesok} 
                alt="onesok"  
                className="object-contain absolute  -rotate-5 top-0 right-7 xl:right-10" 
              />
               <Image 
                src={onesok} 
                alt="onesok"  
                className="object-contain absolute z-10 top-0 right-0" 
              />
               <Image 
                src={onesok} 
                alt="onesok"  
                className="object-contain rotate-5 absolute top-0 -right-7  xl:-right-10" 
              />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}