'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import vrasheniya from '@/public/images/virasheniya.jpg'
import zbor from '@/public/images/zbor.jpg'
import obrobotka from '@/public/images/obrobotka.jpg'
import dostavka from '@/public/images/dostavka.jpg'
import zavod1 from '@/public/images/24.png'
import zavod2 from '@/public/images/zavod2.jpg'
export default function CompactProduction() {
  const productionSteps = [
    {
      title: "Выращивание",
      desc: "Экологичное выращивание фруктов в наших садах",
      img: vrasheniya // Замените на свое изображение
    },
    {
      title: "Сбор урожая",
      desc: "Ручной сбор на пике зрелости",
      img: zbor // Замените на свое изображение
    },
    {
      title: "Обработка",
      desc: "Современная обработка на нашем заводе",
      img: obrobotka // Замените на свое изображение
    },
    {
      title: "Доставка",
      desc: "Быстрая доставка свежих фруктов",
      img: dostavka // Замените на свое изображение
    }
  ];

  return (
    <section id="production" className="pt-16 pb-64 md:mt-[164px] mt-[80px] min-h-screen overflow-hidden  bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">Наше Производство</h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            От сада до вашего стола - гарантия качества и натуральности
          </p>
        </motion.div>

        {/* 4 круглых изображения с процессом */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {productionSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden border-4 border-green-300 shadow-lg">
                {/* Замените div на img для реальных изображений */}
                <Image 
                  className="w-full h-full bg-cover bg-center"
                  src={step.img}
                  alt={step.title}
                  fill
                ></Image>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">{step.title}</h3>
              <p className="text-center text-gray-700">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Блок с фото завода */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Наш Завод</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-xl h-64 bg-gray-200">
           
             <Image src={zavod1} alt="Изображение завода 1" className="w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-64 bg-gray-200">
             <Image src={zavod2} alt="Изображение завода 2" className="w-full h-full" />
            </div>
          </div>
        </motion.div>

        {/* Преимущества в кругах */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Наши Преимущества</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: "🌿", title: "Экологично", desc: "100% натуральные продукты" },
              { icon: "🏆", title: "Качество", desc: "Строгий контроль на всех этапах" },
              { icon: "🚜", title: "Собственное производство", desc: "От сада до упаковки" },
              { icon: "💚", title: "Здоровье", desc: "Польза для вас и природы" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-full bg-white shadow-md border border-green-100 flex flex-col items-center justify-center p-4 text-center"
              >
                <span className="text-3xl mb-2">{item.icon}</span>
                <h3 className="font-bold text-green-800">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}