
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import leftabstrack from '@/public/images/left-abstrack.webp'
import righta1bstrack from '@/public/images/right-1-abstrack.webp'
import righta2bstrack from '@/public/images/right-2-abstrack.webp'
import api from '@/lib/api'
export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0); // Индекс выбранной категории
  
  // Выводим ID выбранной категории в консоль при изменении
  useEffect(() => {
    if (apiData[selectedCategory]?.id) {
      console.log('Выбран ID категории:', apiData[selectedCategory].id);
    }
  }, [selectedCategory, apiData]);

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

  // Состояние для хранения продуктов и отфильтрованных продуктов
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Загружаем категории и продукты
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загружаем категории
        const categoriesResponse = await api.get('/category');
        if (categoriesResponse.data?.data) {
          const sortedData = [...categoriesResponse.data.data].sort((a, b) => {
            const volA = parseFloat(a.titleEn?.replace(/\s+/g, '').replace('L', '')) || 0;
            const volB = parseFloat(b.titleEn?.replace(/\s+/g, '').replace('L', '')) || 0;
            return volB - volA;
          });
          setApiData(sortedData);
          
          // Если есть категории, выбираем первую по умолчанию
          if (sortedData.length > 0) {
            setSelectedCategory(sortedData[0].id);
          }
        }

        // Загружаем продукты
        const productsResponse = await api.get('/products');
        if (productsResponse?.data?.data?.items) {
          const productsData = productsResponse.data.data.items;
          setAllProducts(productsData);
          
          // Устанавливаем отфильтрованные продукты и первый продукт по умолчанию
          if (productsData.length > 0) {
            setFilteredProducts(productsData);
            setSelectedFruit({
              id: productsData[0].id,
              name: productsData[0].titleRu,
              image: productsData[0].iconImage,
              imagecontent: productsData[0].productImage,
              imagedetalies: productsData[0].backgroundImage,
              description: productsData[0].descriptionRu
            });
          }
        }
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
      }
    };

    fetchData();
  }, []);

  // Фильтруем продукты при изменении выбранной категории
  useEffect(() => {
    if (selectedCategory && allProducts.length > 0) {
      const filtered = allProducts.filter(product => 
        product.category?.id === selectedCategory
      );
      setFilteredProducts(filtered);
      
      // Обновляем выбранный продукт
      if (filtered.length > 0) {
        const firstProduct = filtered[0];
        setSelectedFruit({
          id: firstProduct.id,
          name: firstProduct.titleRu,
          image: firstProduct.iconImage,
          imagecontent: firstProduct.productImage,
          imagedetalies: firstProduct.backgroundImage,
          description: firstProduct.descriptionRu
        });
      } else {
        setSelectedFruit(null);
      }
    }
  }, [selectedCategory, allProducts]);
  
  // Состояние для хранения выбранного продукта
  const [selectedFruit, setSelectedFruit] = useState(null);

  // Обработчик выбора фрукта
  const handleFruitSelect = (fruit) => {
    setSelectedFruit(fruit);
  };

  return (
    <div className=' max-w-[1920px] w-full mx-auto mt-8 relative overflow-hidden  '>
       <Image className='absolute max-w-[500px] z-0 bottom-[50%]  md:bottom-[20%]  md:bottom-[30%] left-[-400px] md:left-[-250px]' src={leftabstrack} alt="leftabstrack" />
              <Image className='absolute max-w-[500px] z-0 bottom-[40%] md:bottom-0  right-[-250px]' src={righta1bstrack} alt="righta1bstrack" />
              <Image className='absolute max-w-[500px] z-0 top-[-10%] hidden md:block   opacity-100 right-[-400px] md:right-[-350px]' src={righta2bstrack} alt="righta2bstrack" />
      <div className=" max-w-[1000px] relative z-10 w-full mx-auto">
        {/* Блок с выбранным фруктом */}
        <div className="py-1">
          <div className="flex justify-center  py-2 overflow-hidden items-end  px-4  ">
            {filteredProducts.slice(0, 9).map((product, index, array) => {
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
                  key={product.id} 
                  onClick={() => {
                    setSelectedFruit({
                      id: product.id,
                      name: product.titleRu,
                      image: product.iconImage,
                      imagecontent: product.productImage,
                      imagedetalies: product.backgroundImage,
                      description: product.descriptionRu
                    });
                  }}
                  className={`flex flex-col items-center shrink-0 transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer ${
                    selectedFruit?.id === product.id ? 'ring-4 ring-green-400 rounded-full' : ''
                  }`}
                  style={{ marginBottom: `${marginBottom}px` }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                    <Image 
                      src={product.iconImage} 
                      alt={product.titleRu}
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
        </div>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~category~~~~~~~~~~~~~~~~~~~~~~~~~~`` */}
        <div className="content-category  md:h-[200px] justify-center items-center  flex flex-col-reverse md:flex-row md:justify-between w-full">
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~left content single info */}
          <div className="items-left-content md:w-[50%] h-full relative">
          <div className="flex flex-col md:flex-row md:relative items-center md:justify-end h-full md:items-end">
            
            {selectedFruit?.imagecontent && (
              <Image
                src={selectedFruit.imagecontent}
                alt={selectedFruit.name} 
                className="w-[250px] md:w-[350px] md:absolute left-0 md:bottom-[-200px] bottom-0 block"
                width={350}
                height={350}
                unoptimized={true}
              />
            )}
            <h2 className="md:text-3xl text-xl font-bold text-green-700 mt-1 md:mt-4">
              {selectedFruit?.name || 'Выберите продукт'}
            </h2>
           
          </div>
          </div>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~right content category */}
            <div className="items-right__content md:w-[50%] flex md:gap-4 gap-2 items-end text-sm md:text-md justify-center">
              {apiData.map((category, index) => (
                <div 
                  key={category.id}
                  className={`flex flex-col justify-center items-center cursor-pointer transition-all ${
                    selectedCategory === category.id ? 'transform scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="relative w-[80px] h-[80px] flex items-center justify-center">
                    <Image 
                      src={category.imageUrl} 
                      alt={category.titleRu} 
                      className={`border rounded-full w-full h-full object-contain ${
                        selectedCategory === category.id ? 'ring-2 ring-green-500' : ''
                      }`}
                      width={80}
                      height={80}
                      unoptimized={true}
                    />
                  </div>
                  <span className="mt-1">{category.titleRu}</span>
                </div>
              ))}
            </div>
        </div>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ flagment bottom one */}
        <div className="content-flagment px-1  mt-[10px] md:mt-[50px] flex justify-end  bg-[#2DB851] mb-8   h-64  mx-auto  rounded-3xl shadow-md">
      
          <div className="flex w-full md:w-[70%]   md:gap-4  items-center">
          {selectedFruit?.imagedetalies && (
            <Image
              src={selectedFruit.imagedetalies}
              alt={selectedFruit.name}
              className="w-[50%] png-shadow h-full object-cover"
              width={500}
              height={300}
              unoptimized={true}
            />
          )}
          <p className="w-[50%] text-white md:text-xl text-sm">
            {selectedFruit?.description || 'Выберите продукт для просмотра описания'}
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}
