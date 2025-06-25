'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import leftabstrack from '@/public/images/left-abstrack.webp';
import righta1bstrack from '@/public/images/right-1-abstrack.webp';
import righta2bstrack from '@/public/images/right-2-abstrack.webp';
import api from '@/lib/api';

export default function ProductSelectionPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'uz';
  
  // Функция для получения локализованного поля
  const getLocalizedField = (field, item) => {
    const fieldName = `${field}${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
    return item[fieldName] || item[`${field}Uz`] || '';
  };
  // Объявляем все состояния в начале компонента
  const [isMobile, setIsMobile] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Определение мобильного устройства
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Параллельная загрузка категорий и продуктов
        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get('/category'),
          api.get('/products')
        ]);

        // Обработка категорий
        if (categoriesResponse.data?.data) {
          const sortedCategories = [...categoriesResponse.data.data].sort((a, b) => {
            const volA = parseFloat(a.titleEn?.replace(/\s+/g, '').replace('L', '')) || 0;
            const volB = parseFloat(b.titleEn?.replace(/\s+/g, '').replace('L', '')) || 0;
            return volB - volA;
          });
          setApiData(sortedCategories);
          
          // Получаем категорию из URL или используем первую доступную
          const categoryFromUrl = searchParams.get('category');
          if (categoryFromUrl) {
            const categoryExists = sortedCategories.some(cat => cat.id === categoryFromUrl);
            if (categoryExists) {
              setSelectedCategory(categoryFromUrl);
            } else if (sortedCategories.length > 0) {
              setSelectedCategory(sortedCategories[0].id);
            }
          } else if (sortedCategories.length > 0) {
            setSelectedCategory(sortedCategories[0].id);
          }
        }

        // Обработка продуктов
        if (productsResponse?.data?.data?.items) {
          const productsData = productsResponse.data.data.items;
          setAllProducts(productsData);
           console.log(productsData);
          if (productsData.length > 0) {
            setSelectedFruit(mapProductToFruit(productsData[0]));
          }
        }
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Фильтрация продуктов по выбранной категории
  const filteredProducts = useMemo(() => {
    if (!selectedCategory || allProducts.length === 0) return allProducts;
    return allProducts.filter(product => product.category?.id === selectedCategory);
  }, [selectedCategory, allProducts]);

  // Обновление выбранного продукта при изменении фильтрации
  useEffect(() => {
    if (filteredProducts.length > 0) {
      // Находим текущий выбранный продукт в отфильтрованных или берем первый
      const currentSelected = filteredProducts.find(p => p.id === selectedFruit?.id) || filteredProducts[0];
      setSelectedFruit(mapProductToFruit(currentSelected));
    } else {
      setSelectedFruit(null);
    }
  }, [filteredProducts]);

  // Вспомогательная функция для преобразования продукта
  const mapProductToFruit = (product) => ({
    id: product.id,
    name: getLocalizedField('title', product),
    image: product.iconImage,
    imagecontent: product.productImage,
    imagedetalies: product.backgroundImage,
    description: getLocalizedField('description', product)
  });

  // Обработчик выбора фрукта
  const handleFruitSelect = (product) => {
    setSelectedFruit(mapProductToFruit(product));
  };

  // Обработчик выбора категории
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (isLoading) return   <div className="min-h-screen flex items-center justify-center">
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
</div>
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!apiData.length || !allProducts.length) return <div className="text-center py-20">{t('noDataToDisplay')}</div>;

  return (
    <div className='max-w-[1920px] mt-[40px] sm:mt-[100px] xl:mt-[50px] w-full mx-auto relative overflow-hidden'>
      {/* Фоновые изображения */}
      <Image 
        className='absolute max-w-[500px] z-0 bottom-[20%] md:bottom-[30%] left-[-400px] md:left-[-250px]' 
        src={leftabstrack} 
        alt="Абстрактный фон слева" 
      />
      <Image 
        className='absolute max-w-[500px] z-0 bottom-[40%] md:bottom-0 right-[-250px]' 
        src={righta1bstrack} 
        alt="Абстрактный фон справа 1" 
      />
      <Image 
        className='absolute max-w-[500px] z-0 top-[-10%] hidden md:block opacity-100 right-[-400px] md:right-[-350px]' 
        src={righta2bstrack} 
        alt="Абстрактный фон справа 2" 
      />

      <div className="max-w-[1000px] px-2  xl:px-0 relative z-10 w-full mx-auto">
        {/* Блок с продуктами */}
        <div className="py-1">
          {filteredProducts.length > 0 ? (
            <div className="flex justify-center py-2 overflow-hidden items-end px-4">
              {filteredProducts.slice(0, 9).map((product, index, array) => {
                const centerIndex = Math.floor(array.length / 2);
                const distanceFromCenter = Math.abs(index - centerIndex);
                const maxDistance = Math.floor(array.length / 2);
                const multiplier = isMobile ? 20 : 40;
                const marginBottom = (distanceFromCenter / maxDistance) * multiplier;
                
                return (
                  <div 
                    key={product.id} 
                    onClick={() => handleFruitSelect(product)}
                    className={`flex flex-col items-center shrink-0 transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer ${
                      selectedFruit?.id === product.id ? 'ring-4 ring-green-400 rounded-full' : ''
                    }`}
                    style={{ marginBottom: `${marginBottom}px` }}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                      <Image 
                        src={product.iconImage} 
                        alt={getLocalizedField('title', product)}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              {t('products.noProductsAvailable')}
            </div>
          )}
        </div>

        {/* Основной контент */}
        <div className="content-category md:h-[200px] justify-center items-center flex flex-col-reverse md:flex-row md:justify-between w-full">
          {/* Левая часть - информация о продукте */}
          <div className="items-left-content md:w-[50%] h-full relative">
            <div className="flex flex-col md:flex-row md:relative items-center md:justify-end h-full md:items-end">
              {selectedFruit?.imagecontent && (
                <motion.div
                  key={`image-${selectedFruit.id}`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] md:absolute left-0 md:bottom-[-200px] bottom-0 block"
                >
                  <Image
                    src={selectedFruit.imagecontent}
                    alt={selectedFruit.name} 
                    width={350}
                    height={250}
                    unoptimized={true}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              )}
              <h2 className="md:text-3xl text-xl font-bold text-green-700 mt-1 md:mt-4">
                {selectedFruit?.name || t('products.selectProduct')}
              </h2>
            </div>
          </div>

          {/* Правая часть - категории */}
          <div className="items-right__content md:w-[50%] flex md:gap-4 gap-2 items-end text-sm md:text-md justify-center">
            {apiData.map((category) => (
              <div 
                key={category.id}
                className={`flex flex-col justify-center items-center cursor-pointer transition-all ${
                  selectedCategory === category.id ? 'transform scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="relative w-[80px] h-[80px] flex items-center justify-center">
                  <Image 
                    src={category.imageUrl} 
                    alt={getLocalizedField('title', category)} 
                    className={`border rounded-full w-full h-full object-contain ${
                      selectedCategory === category.id ? 'ring-2 ring-green-500' : ''
                    }`}
                    width={80}
                    height={80}
                    unoptimized={true}
                  />
                </div>
                <span className="mt-1">{getLocalizedField('title', category)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Детальная информация о продукте */}
        <div className="content-flagment px-1 mt-[10px] md:mt-[50px] flex justify-end bg-[#00c853] mb-8 h-64 mx-auto rounded-3xl  shadow-md">
          <div className="flex w-full md:w-[70%] md:gap-4 items-center">
            {selectedFruit?.imagedetalies && (
              <motion.div
                key={`details-${selectedFruit?.id || 'default'}`}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-[50%] h-full"
              >
                <Image
                  src={selectedFruit.imagedetalies}
                  alt={selectedFruit.name}
                  className="w-full png-shadow h-full object-contain"
                  width={500}
                  height={300}
                  unoptimized={true}
                />
              </motion.div>
            )}
            <p className="w-[50%] text-white md:text-xl text-sm">
              {selectedFruit?.description || t('products.selectProductForDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}