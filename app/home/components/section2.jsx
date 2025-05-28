'use client'

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import photo1 from '@/public/images/250format.webp';
import photo2 from '@/public/images/125format.webp';
import rightabastrack2 from '@/public/images/right-2-abstrack.webp';
import leftabstrack2 from '@/public/images/leftabstrack2.webp'
import onesok from '@/public/images/onesok.webp'
import onekaronsok from '@/public/images/onekaronsok.webp'
export default function Section2() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Анимация для абстрактного элемента
  const xPos1 = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [15, 0]);

  // Анимация для абстрактного элемента
  const xPos2 = useTransform(scrollYProgress, [0, 0.5], [-50, 0]); // Изменено на -50
  const opacity2 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [-15, 0]); // Можно сделать вращение в дру
  // Анимация для кубиков
  const cube1Y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const cube2Y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const cube4Y = useTransform(scrollYProgress, [0, 1], [-80, 0]);

  // --- анимация появления для каждого кубика через useInView + useState ---
  // Кубик 1
  const cube1Ref = useRef(null);
  const isInView1 = useInView(cube1Ref, { amount: 0.1, once: true });
  const [animateCube1, setAnimateCube1] = useState(false);
  useEffect(() => {
    if (isInView1) setAnimateCube1(true);
  }, [isInView1]);
  // Кубик 2
  const cube2Ref = useRef(null);
  const isInView2 = useInView(cube2Ref, { amount: 0.1, once: true });
  const [animateCube2, setAnimateCube2] = useState(false);
  useEffect(() => {
    if (isInView2) setAnimateCube2(true);
  }, [isInView2]);
  // Кубик 3
  const cube3Ref = useRef(null);
  const isInView3 = useInView(cube3Ref, { amount: 0.1, once: true });
  const [animateCube3, setAnimateCube3] = useState(false);
  useEffect(() => {
    if (isInView3) setAnimateCube3(true);
  }, [isInView3]);
  // Кубик 4
  const cube4Ref = useRef(null);
  const isInView4 = useInView(cube4Ref, { amount: 0.1 });
  const [animateCube4, setAnimateCube4] = useState(false);
  const [showCenter4, setShowCenter4] = useState(false);
  useEffect(() => {
    if (isInView4) {
      setAnimateCube4(true);
      setShowCenter4(true);
    } else {
      setShowCenter4(false);
    }
  }, [isInView4]);

  return (
    <>
      <div className='section-2 mt-2 px-2 sm:mt-[100px] relative' ref={sectionRef}>
        {/* Анимированный абстрактный элемент */}
     {/* right abstract */}
<motion.div 
  className='absolute max-w-[350px] lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[850px] w-full -top-[25%] -right-[235px] sm:-top-[80%] md:-top-[80%] sm:-right-[235px] md:-right-[235px] lg:-top-[100%] lg:-right-[360px] xl:-top-[140%] xl:-right-[440px] 2xl:-right-[560px]'
  style={{
    x: xPos1,
    opacity: opacity1, // исправлено на opacity
    rotate: rotate1,  // исправлено на rotate
    transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)'
  }}
>
  <Image 
    src={rightabastrack2} 
    alt="Right Abstract" 
    className='w-full h-auto'
  />
</motion.div>

{/* left abstract */}
<motion.div 
  className='absolute  max-w-[120px] md:max-w-[150px] lg:max-w-[180px] xl:max-w-[200px] 2xl:max-w-[300px] w-full -top-[5%]  sm:-top-[40%] 2xl:-top-[60%] left-[5%] sm:left-[10%] 2xl:left-[5%]'
  style={{
    x: xPos2,
    opacity: opacity2, // исправлено на opacity
    rotate: rotate2,  // исправлено на rotate
    transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)'
  }}
>
  <Image 
    src={leftabstrack2} 
    alt="Left Abstract" 
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
  ref={cube1Ref}
  initial={{ opacity: 0, y: -100 }}
  animate={animateCube1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-[300px] w-full xl:h-[300px] h-[190px] sm:h-[250px] relative">
    {/* центральное */}
    {/* левое */}
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={animateCube1 ? { x: -40, opacity: 1 } : { x: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
    >
      <Image
        src={onekaronsok}
        alt="onekaronsok"
        className="object-contain absolute  w-[90%] top-[25px]  right-0 xl:right-6"
      />
    </motion.div>
    {/* правое */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  whileInView={{ x: 40, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
                >
                  <Image 
                    src={onekaronsok}
                    alt="onekaronsok"
                    className="object-contain absolute  w-[90%] top-[25px]  left-0 xl:left-6" 
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                >
                  <Image 
                    src={onekaronsok} 
                    alt="onekaronsok"  
                    className="object-contain absolute z-10 top-0 right-0" 
                  />
                </motion.div>
              </div>
            </motion.div>

{/* Кубик 2 (с фото и текстом) */}
<motion.div
  className="rounded-2xl flex flex-col max-w-[300px] w-full  xl:h-[300px] h-[190px]  sm:h-[250px] items-center justify-center"
  style={{ y: cube2Y }}
  ref={cube2Ref}
  initial={{ opacity: 0, x: -20 }}
  animate={animateCube2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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
    animate={animateCube2 ? { opacity: 1 } : { opacity: 0 }}
    transition={{ delay: 0.4 }}
  >
    SHARBAT VA<br />NEKTARLAR
  </motion.div>
  <motion.div
    className="text-center text-white text-sm xl:text-lg mt-1"
    initial={{ opacity: 0 }}
    animate={animateCube2 ? { opacity: 1 } : { opacity: 0 }}
    transition={{ delay: 0.5 }}
  >
    Ixcham 250 ml qadoqda
  </motion.div>
</motion.div>

{/* Кубик 3 */}
<motion.div
  className=" -mt-[20px] sm:mt-[0px] rounded-2xl flex flex-col max-w-[300px] w-full xl:h-[300px] h-[190px]  sm:h-[250px]  items-center justify-center"
  ref={cube3Ref}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={animateCube3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
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
  className="rounded-2xl flex flex-col items-center justify-center"
  style={{ y: cube4Y }}
  ref={cube4Ref}
  initial={{ opacity: 0, y: -80 }}
  animate={animateCube4 ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-[300px] mt-[30px] sm:-mt-[100px] w-full xl:h-[300px] h-[190px] sm:h-[250px] relative">
    {/* Центральное изображение — сначала появляется (scale) */}
    {/* Левое изображение — выходит из центра влево */}
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={animateCube4 ? { x: -40, opacity: 1 } : { x: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
    >
      <Image
        src={onesok}
        alt="onesok"
        className="object-contain absolute -rotate-5 top-0  right-0 xl:right-3"
      />
    </motion.div>
    {/* Правое изображение — выходит из центра вправо */}
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={animateCube4 ? { x: 40, opacity: 1 } : { x: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
    >
      <Image
        src={onesok}
        alt="onesok"
        className="object-contain rotate-5 absolute top-0 -right-0 xl:-right-3"
      />
    </motion.div>
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={showCenter4 ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
    >
      <Image
        src={onesok}
        alt="onesok"
        className="object-contain absolute z-10 top-0 right-0"
      />
    </motion.div>
  </div>
</motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}