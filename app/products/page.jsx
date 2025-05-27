'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// ~~~~~~~~~~~~~~~~~~~~~~~ Обычные соки ~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Apelsin from '@/public/images/onekaronsok.webp'
import Grusha from '@/public/images/onekaronsok.webp'
import Yabloko from '@/public/images/onekaronsok.webp'
import Kivi from '@/public/images/onekaronsok.webp'
import Limon from '@/public/images/onekaronsok.webp'
import Vishniya from '@/public/images/onekaronsok.webp'

// ~~~~~~~~~~~~~~~~~~~~~~~ Коробочные соки ~~~~~~~~~~~~~~~~~~~~~~~~
import ApelsinKore from '@/public/images/onesok.webp'
import GrushaKore from '@/public/images/onesok.webp'
import YablokoKore from '@/public/images/onesok.webp'
import KiviKore from '@/public/images/onesok.webp'
import LimonKore from '@/public/images/onesok.webp'
import VishniyaKore from '@/public/images/onesok.webp'

// Категории
const categories = [
  { id: 'classic', name: 'Обычные соки' },
  { id: 'box', name: 'Коробочные соки' }
]

// Массивы для товаров
const productsData = {
  classic: [
    { id: 1, name: 'Апельсиновый сок', image: Apelsin },
    { id: 2, name: 'Грушевый сок', image: Grusha },
    { id: 3, name: 'Яблочный сок', image: Yabloko },
    { id: 4, name: 'Киви сок', image: Kivi },
    { id: 5, name: 'Лимонный сок', image: Limon },
    { id: 6, name: 'Вишневый сок', image: Vishniya },
    { id: 7, name: 'Вишневый сок', image: Vishniya },
    { id: 8, name: 'Вишневый сок', image: Vishniya },
  ],
  box: [
    { id: 1, name: 'Апельсиновый (коробка)', image: ApelsinKore },
    { id: 2, name: 'Грушевый (коробка)', image: GrushaKore },
    { id: 3, name: 'Яблочный (коробка)', image: YablokoKore },
    { id: 4, name: 'Киви (коробка)', image: KiviKore },
    { id: 5, name: 'Лимонный (коробка)', image: LimonKore },
    { id: 6, name: 'Вишневый (коробка)', image: VishniyaKore },
    { id: 7, name: 'Вишневый (коробка)', image: VishniyaKore },
    { id: 8, name: 'Вишневый (коробка)', image: VishniyaKore },
  ]
}

// Полные данные с описаниями
const fullProductsData = {
  classic: productsData.classic.map(item => ({
    ...item,
    description: `${item.name} - натуральный сок прямого отжима без добавок.`
  })),
  box: productsData.box.map(item => ({
    ...item,
    description: `${item.name} - сок в удобной коробочной упаковке, 1 литр.`
  }))
}

export default function ProductsPage() {
  const [currentCategory, setCurrentCategory] = useState('classic')
  const [selectedItem, setSelectedItem] = useState(fullProductsData.classic[0])

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId)
    setSelectedItem(fullProductsData[categoryId][0])
  }

  const handleItemClick = (itemId) => {
    const foundItem = fullProductsData[currentCategory].find(item => item.id === itemId)
    if (foundItem) setSelectedItem(foundItem)
  }

  return (
    <div className='products pt-16 pb-32 md:pb-64 md:mt-[164px] mt-[80px] min-h-screen bg-gradient-to-b from-green-50 to-white'>
      <h1 className="text-center text-3xl font-bold mb-6 md:mb-8">MAHSULOTLAR</h1>
      
      {/* Селектор категорий */}
      <div className="flex justify-center mb-6 md:mb-8 px-2">
        <div className="flex gap-2 justify-center  bg-white p-1 rounded-full shadow-md">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full transition-all ${
                currentCategory === category.id 
                  ? 'bg-green-500 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full px-2 md:px-4 flex flex-col md:flex-row gap-4 md:gap-8 h-auto md:h-[70vh]">
        {/* Левое меню с прокруткой */}
        <div className="left-content w-full md:w-1/3 bg-white rounded-lg shadow overflow-hidden order-2 md:order-1">
          <div className="overflow-y-auto h-[300px] md:h-full px-2 pb-4">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {productsData[currentCategory].map((item) => (
                <div 
                  key={`${currentCategory}-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`cursor-pointer p-1 md:p-2 rounded transition-all ${
                    selectedItem.id === item.id ? 'bg-green-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="relative h-24 md:h-32 w-full">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-center mt-1 md:mt-2 text-xs md:text-sm font-medium truncate px-1">
                    {item.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Правый контент - теперь сверху на мобильных */}
        <div className="right-content w-full md:w-2/3 bg-white rounded-lg shadow overflow-hidden order-1 md:order-2 mb-4 md:mb-0">
          <motion.div
            key={`${currentCategory}-${selectedItem.id}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col md:flex-row"
          >
            <div className="relative h-48 md:h-full w-full md:w-1/2 min-h-[200px] md:min-h-[300px]">
              <Image 
                src={selectedItem.image} 
                alt={selectedItem.name}
                fill
                className="object-contain p-2 md:p-4"
                priority
              />
            </div>
            <div className="w-full md:w-1/2 p-3 md:p-6 overflow-y-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {selectedItem.name}
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                {selectedItem.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}