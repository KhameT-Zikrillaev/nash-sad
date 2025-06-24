'use client'
import { useEffect, useState, use, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function NewsDetailsPage({ params }) {
  const { t, i18n } = useTranslation();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [newsItem, setNewsItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(null);
  const imageRef = useRef(null);
  
  // Получаем текущий язык
  const currentLang = i18n.language || 'uz';
  
  // Функция для получения локализованного поля
  const getLocalizedField = (field, item) => {
    const fieldName = `${field}${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
    return item[fieldName] || item[`${field}Uz`] || ''; // Возвращаем на узбекском, если перевод не найден
  };

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        console.log('Fetching news with ID:', id);
        const response = await api.get(`/news/${id}`);
        console.log('API Response:', response);
        
        if (response.data) {
          console.log('News data:', response.data.data);
          setNewsItem(response.data.data);
        } else {
          console.log('No data received from API');
          setError('Новость не найдена');
        }
      } catch (err) {
        console.error('Ошибка при загрузке новости:', err);
        setError('Не удалось загрузить новость');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNewsItem();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#32ba4e] mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка новости...</p>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return <div className=" mt-[120px] relative overflow-hidden md:mt-[180px] lg:mt-[200px] xl:mt-[164px] py-4 px-4 sm:px-6 lg:px-12 text-red-500">{error || 'Новость не найдена'}</div>;
  }

  // Показываем контент только после загрузки изображения
  const showContent = !newsItem?.image || isImageLoaded;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen mt-[20px] sm:mt-[50px] py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={showContent ? "visible" : "hidden"}
          >
            <Link 
              href="/news" 
              className="inline-flex items-center text-[#32ba4e] mb-6 hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('news.back_to_news')}
            </Link>
          </motion.div>
          
          <motion.article 
            className="rounded-xl overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={showContent ? "visible" : "hidden"}
          >
            {newsItem.image && (
              <motion.div 
                className="w-full h-64 md:h-96 relative mb-8"
                variants={itemVariants}
              >
                <Image
                  ref={imageRef}
                  src={newsItem.image}
                  alt={getLocalizedField('title', newsItem) || t('news.image_alt')}
                  fill
                  className="object-contain w-full h-full"
                  priority
                  onLoadingComplete={() => setIsImageLoaded(true)}
                />
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#32ba4e]"></div>
                  </div>
                )}
              </motion.div>
            )}
            
            {showContent && (
              <motion.div 
                className="mt-6"
                variants={itemVariants}
              >
                <motion.h1 
                  className="text-xl md:text-3xl font-bold text-gray-900 my-2"
                  variants={itemVariants}
                >
                  {getLocalizedField('title', newsItem) || t('news.no_title')}
                </motion.h1>
                
                <motion.div 
                  className="prose max-w-none text-gray-700"
                  variants={itemVariants}
                >
                  {getLocalizedField('description', newsItem) ? (
                    getLocalizedField('description', newsItem).split('\n\n').map((paragraph, index) => (
                      <motion.p 
                        key={index} 
                        className="mb-4"
                        variants={itemVariants}
                      >
                        {paragraph}
                      </motion.p>
                    ))
                  ) : (
                    <motion.p variants={itemVariants}>
                      {t('news.no_description')}
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </motion.article>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}