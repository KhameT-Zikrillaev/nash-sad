
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import image1 from '@/public/images/NashSadconceptdraft1.png';
import image2 from '@/public/images/NashSadconceptdraft2.png';
import image3 from '@/public/images/NashSadconceptdraft3.png';
import image4 from '@/public/images/NashSadconceptdraft4.png';
import image5 from '@/public/images/NashSadconceptdraft5.png';
import imagesok1 from '@/public/images/NashSadconceptsok1.png';
import imagedetalies1 from '@/public/images/NashSadconceptdetalies11.png';
import leftabstrack from '@/public/images/left-abstrack.webp'
import righta1bstrack from '@/public/images/right-1-abstrack.webp'
import righta2bstrack from '@/public/images/right-2-abstrack.webp'
export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция для обновления состояния при изменении размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Устанавливаем начальное значение
    handleResize();

    // Добавляем слушатель события изменения размера окна
    window.addEventListener('resize', handleResize);

    // Удаляем слушатель при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Массив с данными о фруктах
  const fruits = [
    { id: 1, image: image1, name: 'Ананас', 
      imagecontent:imagesok1,
      imagedetalies:imagedetalies1,
       description: 'Ананас - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 2, image: image2, name: 'Зеленое яблоко', imagecontent:imagesok1, imagedetalies:imagedetalies1, description: 'Зеленое яблоко - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 3, image: image3, name: 'Красные ягоды', imagecontent:imagesok1, imagedetalies:imagedetalies1, description: 'Красные ягоды - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 4, image: image4, name: 'Апельсин', imagecontent:imagesok1, imagedetalies:imagedetalies1, description: 'Апельсин - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 5, image: image5, name: 'Манго', imagecontent:imagesok1, imagedetalies:imagedetalies1, description: 'Манго - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 6, image: image1, name: 'Ананас', imagecontent: imagesok1, imagedetalies:imagedetalies1, description: 'Ананас - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 7, image: image2, name: 'Зеленое яблоко', imagecontent: imagesok1, imagedetalies:imagedetalies1, description: 'Зеленое яблоко - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 8, image: image3, name: 'Красные ягоды', imagecontent: imagesok1, imagedetalies:imagedetalies1, description: 'Красные ягоды - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 9, image: image4, name: 'Апельсин', imagecontent: imagesok1, imagedetalies:imagedetalies1, description: 'Апельсин - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
    { id: 10, image: image5, name: 'Манго', imagecontent: imagesok1, imagedetalies:imagedetalies1, description: 'Манго - этоropicalный фрукт, который имеет яркие красные листья и яркие красные ягоды.' },
  ]
  
  // Состояние для хранения выбранного фрукта
  const [selectedFruit, setSelectedFruit] = useState(fruits[0]);

  // Обработчик выбора фрукта
  const handleFruitSelect = (fruit) => {
    setSelectedFruit(fruit);
  };

  return (
    <div className=' max-w-[1920px] w-full mx-auto mt-[20%] relative overflow-hidden  md:mt-[180px] lg:mt-[200px] xl:mt-[164px]'>
       <Image className='absolute max-w-[500px] z-0 bottom-[50%]  md:bottom-[20%]  md:bottom-[30%] left-[-400px] md:left-[-250px]' src={leftabstrack} alt="leftabstrack" />
              <Image className='absolute max-w-[500px] z-0 bottom-[40%] md:bottom-0  right-[-250px]' src={righta1bstrack} alt="righta1bstrack" />
              <Image className='absolute max-w-[500px] z-0 top-[-10%] hidden md:block   opacity-100 right-[-400px] md:right-[-350px]' src={righta2bstrack} alt="righta2bstrack" />
      <div className=" max-w-[1000px] relative z-10 w-full mx-auto">
        {/* Блок с выбранным фруктом */}
        <div className="py-1">
          <div className="flex justify-center  py-2 overflow-hidden items-end  px-4  ">
            {fruits.slice(0, 9).map((fruit, index, array) => {
              // Находим индекс центрального элемента
              const centerIndex = Math.floor(array.length / 2);
              // Вычисляем расстояние от центра (от 0 до centerIndex)
              const distanceFromCenter = Math.abs(index - centerIndex);
              // Максимальное расстояние от центра (для нормализации)
              const maxDistance = Math.floor(array.length / 2);
              // Определяем множитель в зависимости от ширины экрана
              const multiplier = isMobile ? 20 : 40;
              // Нормализуем отступ (от 0 до 1) и умножаем на множитель
              const marginBottom = (distanceFromCenter / maxDistance) * multiplier;
              
              return (
                <div 
                  key={fruit.id} 
                  onClick={() => handleFruitSelect(fruit)}
                  className={`flex flex-col items-center shrink-0 transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer ${
                    selectedFruit.id === fruit.id ? 'ring-4 ring-green-400 rounded-full' : ''
                  }`}
                  style={{ marginBottom: `${marginBottom}px` }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                    <Image 
                      src={fruit.image} 
                      alt={fruit.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
              
                </div>
              );
            })}
          </div>
        </div>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~category~~~~~~~~~~~~~~~~~~~~~~~~~~`` */}
        <div className="content-category  md:h-[200px] justify-center items-center  flex flex-col-reverse md:flex-row md:justify-between w-full">
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~left content single info */}
          <div className="items-left-content md:w-[50%] h-full relative">
          <div className="flex flex-col md:flex-row md:relative items-center md:justify-end h-full md:items-end">
            
            <Image
                src={selectedFruit.imagecontent}
                alt={selectedFruit.name} 
                className="w-[250px] md:w-[350px]  md:absolute left-0 md:bottom-[-200px] bottom-0  block"
              />
           
              <h2 className=" md:text-3xl text-xl font-bold text-green-700  mt-1 md:mt-4">{selectedFruit.name}</h2>
          </div>
          </div>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~right content category */}
            <div className="items-right__content md:w-[50%] flex md:gap-8 gap-2 items-end text-sm md:text-md justify-center">
              <div className=" flex flex-col justify-center items-center"><span className='md:w-8 md:h-36 w-6 h-28 block border border-red-500'></span> <span>1 L</span></div>
              <div className=" flex flex-col justify-center items-center"><span className='md:w-8 md:h-20 w-6 h-16 block border border-red-500'></span> <span>0.5 L</span></div>
              <div className=" flex flex-col justify-center items-center"><span className='md:w-8 md:h-16 w-6 h-12 block border border-red-500'></span> <span>0.25 L</span></div>
              <div className=" flex flex-col justify-center items-center"><span className='md:w-8 md:h-12 w-6 h-10 block border border-red-500'></span> <span>0.125 L</span></div>
            </div>
        </div>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ flagment bottom one */}
        <div className="content-flagment px-1  mt-[10px] md:mt-[50px] flex justify-end  bg-[#2DB851] mb-8   h-64  mx-auto  rounded-3xl shadow-md">
      
          <div className="flex w-full md:w-[70%]  md:gap-4  items-center">
          <Image
            src={selectedFruit.imagedetalies}
            alt={selectedFruit.name} 
            
            className="w-[70%] png-shadow h-full object-cover"
          />  
            <p className="text-white md:text-xl text-sm">{selectedFruit.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
