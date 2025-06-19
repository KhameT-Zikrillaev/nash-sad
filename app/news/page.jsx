'use client'
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardNews from '@/app/components/Cards/CardNews';
import Image from 'next/image';
import leftabstrack from '@/public/images/left-abstrack.webp';
import righta1bstrack from '@/public/images/right-1-abstrack.webp';
import righta2bstrack from '@/public/images/right-2-abstrack.webp';
import api from '@/lib/api';
const NewsPage = () => {
  const { t, i18n } = useTranslation();
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Получаем текущий язык
  const currentLang = i18n.language || 'uz';
  
  // Функция для получения локализованного поля
  const getLocalizedField = (field, item) => {
    const fieldName = `${field}${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
    return item[fieldName] || item[`${field}Uz`] || ''; // Возвращаем на узбекском, если перевод не найден
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/news');
        // Преобразуем данные из API в нужный формат
        const formattedData = response.data?.data?.map(item => ({
          id: item.id,
          title: getLocalizedField('title', item),
          description: getLocalizedField('description', item),
          date: new Date(item.createdAt).toLocaleDateString('ru-RU'),
          imageUrl: item.image,
          // Сохраняем все данные для использования при переключении языка
          ...item
        })) || [];
        
        setNewsData(formattedData);
      } catch (err) {
        console.error('Ошибка при загрузке новостей:', err);
        setError('Не удалось загрузить новости. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentLang]); // Добавляем currentLang в зависимости
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[20px]  relative overflow-hidden  py-4 px-4 sm:px-6 lg:px-12">
      <Image className='absolute max-w-[500px] z-0 bottom-[20%] opacity-60 lg:opacity-100 md:bottom-0 left-[-400px] md:left-[-350px]' src={leftabstrack} alt="leftabstrack" />
      <Image className='absolute max-w-[500px] z-0 bottom-[20%] md:bottom-[-15%] opacity-60 lg:opacity-100 right-[-350px]' src={righta1bstrack} alt="righta1bstrack" />
      <Image className='absolute max-w-[500px] z-0 top-[-10%] opacity-60 lg:opacity-100 right-[-400px] md:right-[-350px]' src={righta2bstrack} alt="righta2bstrack" />
      <div className="container relative z-10">
       
        
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