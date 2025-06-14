'use client'
import React from 'react';
import CardNews from '@/app/components/Cards/CardNews';
import  image1 from '@/public/images/24.png'
import  image2 from '@/public/images/24.png'
import Image from 'next/image'
import leftabstrack from '@/public/images/left-abstrack.webp'
import righta1bstrack from '@/public/images/right-1-abstrack.webp'
import righta2bstrack from '@/public/images/right-2-abstrack.webp'
const NewsPage = () => {
  const newsData = [
    {
      id: 1,
      title: "Заголовок новости 1",
      description: "Краткое описание новости. Здесь будет несколько предложений, описывающих основное содержание новости.",
      date: "15 июня 2024",
      imageUrl: image1
    },
    {
      id: 2,
      title: "Заголовок новости 2",
      description: "Еще одно описание новости. Этот текст будет обрезан, если будет слишком длинным.",
      date: "10 июня 2024",
      imageUrl: image2
    },
    {
      id: 3,
      title: "Заголовок новости 3",
      description: "Еще одно описание новости. Этот текст будет обрезан, если будет слишком длинным.",
      date: "10 июня 2024",
      imageUrl: image2
    },
    {
      id: 4,
      title: "Заголовок новости 4",
      description: "Еще одно описание новости. Этот текст будет обрезан, если будет слишком длинным.",
      date: "10 июня 2024",
      imageUrl: image2
    },
    // Add more news items as needed
  ];

  return (
    <div className="min-h-screen mt-[120px] relative overflow-hidden md:mt-[180px]  lg:mt-[200px] xl:mt-[164px]  py-4 px-4 sm:px-6 lg:px-12">

              <Image className='absolute max-w-[500px] z-0  bottom-[20%] opacity-60 lg:opacity-100 md:bottom-0 left-[-400px] md:left-[-350px]' src={leftabstrack} alt="leftabstrack" />
              <Image className='absolute max-w-[500px] z-0 bottom-[20%] md:bottom-[-15%] opacity-60 lg:opacity-100 right-[-350px]' src={righta1bstrack} alt="righta1bstrack" />
              <Image className='absolute max-w-[500px] z-0 top-[-10%] opacity-60 lg:opacity-100 right-[-400px] md:right-[-350px]' src={righta2bstrack} alt="righta2bstrack" />
      <div className="container relative z-10">
        <h1 className="md:text-3xl text-xl font-bold text-center text-gray-900 mb-4">Yangiliklar</h1>
        
        <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
          {newsData.map((newsItem) => (
            <CardNews
              key={newsItem.id}
              id={newsItem.id}
              title={newsItem.title}
              description={newsItem.description}
              date={newsItem.date}
              imageUrl={newsItem.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;