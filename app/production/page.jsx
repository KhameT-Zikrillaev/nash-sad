
'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from '@/public/images/24.png';
import img2 from '@/public/images/24.png';
import img3 from '@/public/images/24.png';
import img4 from '@/public/images/24.png';

export default function Production() {
  const imageData = [
    {
      id: 1,
      image: img1,
      alt: 'Ishlab chiqarish jarayoni 1',
    },
    {
      id: 2,
      image: img2,
      alt: 'Ishlab chiqarish jarayoni 2',
    },
    {
      id: 3,
      image: img3,
      alt: 'Ishlab chiqarish jarayoni 3',
    },
    {
      id: 4,
      image: img4,
      alt: 'Ishlab chiqarish jarayoni 4',
    },
  ];
  return (
    <>
     <div className='ProductionPage max-w-[1920px] w-full mx-auto mt-[25%] relative overflow-hidden  md:mt-[200px] lg:mt-[220px] xl:mt-[200px]'>
          <div className="container">
            {/* ~~~~~~~~~~~~~~~~static number content */}
            <div className="static-content flex   flex-wrap max-w-[700px] w-full mx-auto justify-center md:justify-between items-center">
              {/* ~~~~~~~~~~~~~~~~~~~~1 */}
            <div className="flex items-center gap-2">
  <h3 className="md:text-6xl text-3xl font-bold text-green-600">
    5.5 <span className="block md:text-xl text-lg font-semibold">gektar</span>
  </h3>
  <p className="text-gray-600  leading-[1.2] w-[100px]" >ishlab chiqarish hududi</p>
            </div>
            {/* ~~~~~~~~~~~~~~~~~~~~2 */}
            <div className="flex items-center gap-2">
  <h3 className="md:text-6xl text-3xl font-bold text-green-600">
    3 <span className="block md:text-xl text-lg font-semibold">ta</span>
  </h3>
  <p className="text-gray-600 leading-[1.2] w-[100px]">yirik texnologik komplekslari</p>
            </div>
            {/* ~~~~~~~~~~~~~~~~~~~~3 */}
            <div className="flex items-center gap-2">
  <h3 className="md:text-6xl text-3xl font-bold text-green-600">
    20<span className="block md:text-xl text-lg font-semibold">dan ortiq</span>
  </h3>
  <p className="text-gray-600 leading-[1.2] w-[100px]">mahsulot turlari</p>
            </div>
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
              <p>Sharbat va ichimliklarni quyib qadoqlash sexi kompleksli zamonaviy yuqori texnologik liniyalari bilan jihozlangan bo'lib, meva sharbati va nektarlarinin tayyorlanishidan qadoqlanishigacha jarayon amalga oshiriladi. Liniyalar to'liq avtomatlashtirilgan. Yillik ishlab chiqarish quvvati 5 ming tonna tayyor mahsulotdir.</p>
              <br/>
              <p>Korxona SGS (Shveytsariya) tomonidan FSSC 22000 oziq-ovqat mahsulotlari sifati va xavfsizligi tizimiga muvofiq sertifikatlangan. Ichki sifatni nazorat qilish tartiblari quyidagilar bilan ta'minlanadi:</p>
              <ul className='flex flex-col  gap-1 md:gap-2  mt-2 md:mt-4 list-disc pl-6'>
                <li>Mahsulotning ishonchliligi, organoleptik ko'rsatkichlar doimiyligining ta'minlanishi;</li>
                <li>Keyinchalik sifati uchun iste'molchi oldida javobgar bo'la olish uchun, mahsulotning har bir partiyasining to'liq tekshirilishi;</li>
                <li>Barcha sanitariya-gigiyena me'yorlari va shartlarini bajarilishi;</li>
                <li>Ishlab chiqarish liniyalarida mahsulotni ishlab chiqarish jarayonining nazorat qilinishi;</li>
              </ul>
            </article>

        
          </div>
              {/* ~~~~~~~~~~~~~~~~swiper-1 content */}
              <div className='swiper-1-content mt-12 w-full mx-auto max-w-[1920px]'>
  <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center'>Ishlab chiqarish jarayoni</h2>
  <Swiper
    modules={[ Pagination, Autoplay]}
    spaceBetween={30}
    slidesPerView={1.1} // На мобильных: 1.8 слайда (первый наполовину)
    centeredSlides={false}
 
    loop={true}
    pagination={{ clickable: true }}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: {
        slidesPerView: 1.1, // На планшетах: 2.8 слайда (первый наполовину)
      },
      1024: {
        slidesPerView: 2.2, // На десктопах: 4.2 слайда (первый и последний наполовину)
      },
    }}
    className="mySwiper"
    style={{
      paddingLeft: "10%", // Регулирует, насколько первый слайд скрыт
      paddingRight: "3%", // Регулирует, насколько последний слайд скрыт
    }}
  >
    {imageData.map((item) => (
      <SwiperSlide key={item.id} className="h-auto">
        <div className="relative h-64 md:h-80 border rounded-xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover"
            priority={item.id === 1}
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
     </div>
    </>
  )
}
