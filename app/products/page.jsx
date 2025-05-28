'use client';
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ~~~~~~~~~~~~~~~~~~~~~~~ Oddiy sharbatlar ~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Apelsin from '@/public/images/onekaronsok.webp'
import Grusha from '@/public/images/onekaronsok.webp'
import Yabloko from '@/public/images/onekaronsok.webp'
import Kivi from '@/public/images/onekaronsok.webp'
import Limon from '@/public/images/onekaronsok.webp'
import Vishniya from '@/public/images/onekaronsok.webp'

// ~~~~~~~~~~~~~~~~~~~~~~~ Qutili sharbatlar ~~~~~~~~~~~~~~~~~~~~~~~~
import ApelsinKore from '@/public/images/onesok.webp'
import GrushaKore from '@/public/images/onesok.webp'
import YablokoKore from '@/public/images/onesok.webp'
import KiviKore from '@/public/images/onesok.webp'
import LimonKore from '@/public/images/onesok.webp'
import VishniyaKore from '@/public/images/onesok.webp'

// Kategoriyalar
const categories = [
  { id: 'classic', name: 'Oddiy sharbatlar' },
  { id: 'box', name: 'Qutili sharbatlar' }
]

// Mahsulotlar massivi
const productsData = {
  classic: [
    { id: 1, name: 'Apelsin sharbati', image: Apelsin, volume: '1 l' },
    { id: 2, name: 'Nok sharbati', image: Grusha, volume: '1 l' },
    { id: 3, name: 'Olma sharbati', image: Yabloko, volume: '1 l' },
    { id: 4, name: 'Kivi sharbati', image: Kivi, volume: '1 l' },
    { id: 5, name: 'Limon sharbati', image: Limon, volume: '1 l' },
    { id: 6, name: 'Gilos sharbati', image: Vishniya, volume: '1 l' },
  ],
  box: [
    { id: 1, name: 'Apelsin (qutilida)', image: ApelsinKore, volume: '1 l' },
    { id: 2, name: 'Nok (qutilida)', image: GrushaKore, volume: '1 l' },
    { id: 3, name: 'Olma (qutilida)', image: YablokoKore, volume: '1 l' },
    { id: 4, name: 'Kivi (qutilida)', image: KiviKore, volume: '1 l' },
    { id: 5, name: 'Limon (qutilida)', image: LimonKore, volume: '1 l' },
    { id: 6, name: 'Gilos (qutilida)', image: VishniyaKore, volume: '1 l' },
  ]
}

// To'liq mahsulot ma'lumotlari
const fullProductsData = {
  classic: productsData.classic.map(item => ({
    ...item,
    description: `${item.name} - qo'shimchalar qo'shilmagan, to'g'ridan-to'g'ri siqilgan tabiiy sharbat. Saralangan mevalardan tayyorlangan. Barcha vitaminlar va tabiiy lazzatni saqlaydi. Sog'lom ovqatlanish uchun ideal.`,
    benefits: ['Konservantlarsiz', 'Shakarsiz', 'GMOsiz', 'Vitaminlarga boy']
  })),
  box: productsData.box.map(item => ({
    ...item,
    description: `${item.name} - qulay qutilidagi sharbat, sayohatlar, pikniklar va yo'lda iste'mol qilish uchun juda qulay. Barcha foydali xususiyatlarni saqlaydi.`,
    benefits: ['Qulay qadoq', 'Uzoq saqlash muddati', 'Naychasi bilan', 'Sayohatlar uchun ideal']
  }))
}

export default function ProductsPage() {
  const [currentCategory, setCurrentCategory] = useState('classic')
  const [selectedItem, setSelectedItem] = useState(fullProductsData.classic[0])
  const [isHovering, setIsHovering] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    setSelectedItem(fullProductsData[currentCategory][0])
  }, [currentCategory])

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId)
  }

  const handleItemClick = (itemId) => {
    const foundItem = fullProductsData[currentCategory].find(item => item.id === itemId)
    if (foundItem) setSelectedItem(foundItem)
  }

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
    setScrollProgress(progress)
  }

  const handleContactClick = () => {
    // Aloqa uchun telefon raqamiga yo'naltirish
    window.location.href = 'tel:+1234567890';
  }

  return (
    <div className='products mt-[80px] pb-32 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50'>
      <div className="container mx-auto px-4 py-24 md:py-32">
        {/* Sarlavha animatsiyasi */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400"
        >
          BIZNING SHARBATLARIMIZ
        </motion.h1>
        
        {/* Kategoriyalar tanlovi */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-8 md:mb-12"
        >
          <div className="flex gap-1 bg-white/30 backdrop-blur-md p-1 rounded-xl shadow-lg border border-white/20">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg text-sm md:text-base font-medium transition-all ${
                  currentCategory === category.id 
                    ? 'bg-white text-green-600 shadow-md' 
                    : 'text-gray-700 hover:bg-white/50'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Chap menyu (aylanma effekt) */}
          <motion.div 
            className="w-full lg:w-2/5 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div 
                className="overflow-y-auto h-[400px] md:h-[500px] p-4 grid grid-cols-2 gap-4"
                onScroll={handleScroll}
              >
                {productsData[currentCategory].map((item) => (
                  <motion.div 
                    key={`${currentCategory}-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer bg-white rounded-xl p-3 transition-all border-2 ${
                      selectedItem.id === item.id 
                        ? 'border-green-400 shadow-lg' 
                        : 'border-transparent hover:border-green-200'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-40 w-full">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-contain hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3">
                      <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{item.volume}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Scroll ko'rsatkichi */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <motion.div 
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* O'ng tomon - mahsulot tafsilotlari */}
          <div className="w-full lg:w-3/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCategory}-${selectedItem.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Mahsulot rasmi (parallaks effekti) */}
                  <div 
                    className="relative h-64 md:h-auto w-full md:w-1/2 min-h-[300px] bg-gradient-to-br from-green-100 to-white"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <motion.div
                      animate={{
                        scale: isHovering ? 1.05 : 1,
                        y: isHovering ? -10 : 0
                      }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={selectedItem.image} 
                        alt={selectedItem.name}
                        fill
                        className="object-contain p-8"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                    {/* Yorliq */}
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      SOTUVLAR LIDERI
                    </div>
                  </div>
                  
                  {/* Mahsulot haqida ma'lumot */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                    <div className="flex-grow">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {selectedItem.name}
                      </h2>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                          {selectedItem.volume}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {selectedItem.description}
                      </p>
                      
                      <div className="mb-8">
                        <h3 className="font-semibold text-gray-900 mb-3">Afzalliklar:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedItem.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Harakat tugmalari */}
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                        onClick={handleContactClick}
                      >
                        Biz bilan bog'laning
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}