'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logowhite from '@/public/images/logowhite.png';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('UZ');
  const [langOpen, setLangOpen] = useState(false);
  const LANGS = ['UZ', 'RU', 'EN'];

  // Анимация для пунктов меню
  const menuItems = [
    { text: 'ISHLAB CHIQARISH', delay: 0.4 },
    { text: 'MAHSULOTLAR', delay: 0.5 },
    { text: 'YANGILIKLAR', delay: 0.6 },
    { text: "BOG'LANISH", delay: 0.7 }
  ];

  // Варианты анимации
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
   
      className="bg-[#32ba4e] border-b-[2px] border-blue-200/10 shadow-xl w-full"
    >
      <div className="container h-[80px] md:h-auto mx-auto px-0 py-2 md:py-6 flex flex-col items-center">
        {/* Лого с анимацией */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="font-bold absolute md:static text-2xl text-white pt-3 mt-0 md:pt-0 md:mt-4 md:mb-2 select-none text-center"
        >
          <Image className='w-[60px]' src={logowhite} alt="logo" />
        </motion.div>

        {/* Меню + LANG SELECT (десктоп) */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full flex-row items-center justify-center hidden md:flex relative"
        >
          <motion.ul className="flex gap-12 font-semibold text-white text-base">
            {menuItems.map((menuItem, index) => (
              <motion.li
                key={menuItem.text}
                variants={item}
                transition={{ delay: menuItem.delay }}
                className="hover:text-blue-200 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {menuItem.text}
              </motion.li>
            ))}
          </motion.ul>

          {/* Языковой селектор с анимацией */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="ml-10 relative select-none"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={
                `flex items-center gap-1 justify-center bg-[#159143] text-white font-bold rounded-full w-12 h-10 shadow-lg text-base px-2 focus:outline-none transition-all duration-200 border-2 border-transparent hover:border-[#32ba4e]`
              }
              onClick={() => setLangOpen((v) => !v)}
              tabIndex={0}
              aria-label="Выбрать язык"
            >
              <svg className="w-5 h-5 mr-1 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="#159143" />
                <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="#fff" strokeWidth="1.2" />
              </svg>
              <span>{lang}</span>
              <svg className={`w-3 h-3 ml-1 transform transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-24 bg-white rounded-xl shadow-2xl z-30 py-2 ring-1 ring-[#159143]/10"
                >
                  {LANGS.map((l) => (
                    <motion.li
                      key={l}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex items-center gap-2 px-4 py-2 text-base cursor-pointer transition font-semibold rounded-lg
                        ${l === lang ? 'bg-[#32ba4e] text-white shadow' : 'text-[#159143] hover:bg-[#eafbee] hover:text-[#159143]'}`}
                      onMouseDown={() => { setLang(l); setLangOpen(false); }}
                    >
                      <span className="inline-block w-4 h-4 mr-1">
                        {l === 'UZ' && <span role="img" aria-label="uz">🇺🇿</span>}
                        {l === 'RU' && <span role="img" aria-label="ru">🇷🇺</span>}
                        {l === 'EN' && <span role="img" aria-label="en">🇬🇧</span>}
                      </span>
                      {l}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Бургер-меню (мобилка) */}
        <div className="w-full flex items-center justify-between md:hidden">
          <div></div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`relative top-[40%] right-2 flex items-center justify-center w-8 h-8 rounded-sm bg-[#159143] shadow-lg focus:outline-none transition-all duration-200 group ${menuOpen ? 'ring-2 ring-[#32ba4e]/70' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className={`absolute block h-[3px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-[25%] left-1/2 -translate-x-1/2'}`}></span>
            <span className={`absolute block h-[3px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}`}></span>
            <span className={`absolute block h-[3px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-[70%] left-1/2 -translate-x-1/2'}`}></span>
          </motion.button>
        </div>

        {/* Мобильное меню с анимацией */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-20"
                onClick={() => setMenuOpen(false)}
              ></motion.div>
              
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full w-[80vw] max-w-xs bg-[#32ba4e] z-30 flex flex-col pt-28 pb-10 px-6 font-semibold text-white text-lg shadow-2xl rounded-tr-3xl rounded-br-3xl md:hidden"
              >
                <motion.ul className="flex flex-col gap-2">
                  {menuItems.map((menuItem, index) => (
                    <motion.li
                      key={menuItem.text}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="hover:text-blue-200 transition cursor-pointer py-4 pl-10 pr-2 hover:bg-white/10 font-bold text-xl border-b border-white/30"
                      onClick={() => setMenuOpen(false)}
                    >
                      {menuItem.text}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Языковой селектор для мобилки */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={
                      `flex items-center gap-1 justify-center bg-[#159143] text-white font-bold rounded-full w-24 h-12 shadow-lg text-base px-2 focus:outline-none transition-all duration-200 border-2 border-transparent hover:border-[#32ba4e] mx-auto`
                    }
                    onClick={() => setLangOpen((v) => !v)}
                    onBlur={() => setTimeout(() => setLangOpen(false), 120)}
                    tabIndex={0}
                    aria-label="Выбрать язык"
                  >
                    <svg className="w-5 h-5 mr-1 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="#159143" />
                      <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="#fff" strokeWidth="1.2" />
                    </svg>
                    <span>{lang}</span>
                    <svg className={`w-3 h-3 ml-1 transform transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </motion.button>
                  
                  <AnimatePresence>
                    {langOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-8 mt-2 w-24 bg-white rounded-xl shadow-2xl z-40 py-2 ring-1 ring-[#159143]/10"
                      >
                        {LANGS.map((l) => (
                          <motion.li
                            key={l}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`flex items-center gap-2 px-4 py-2 text-base cursor-pointer transition font-semibold rounded-lg
                              ${l === lang ? 'bg-[#32ba4e] text-white shadow' : 'text-[#159143] hover:bg-[#eafbee] hover:text-[#159143]'}`}
                            onMouseDown={() => { setLang(l); setLangOpen(false); }}
                          >
                            <span className="inline-block w-4 h-4 mr-1">
                              {l === 'UZ' && <span role="img" aria-label="uz">🇺🇿</span>}
                              {l === 'RU' && <span role="img" aria-label="ru">🇷🇺</span>}
                              {l === 'EN' && <span role="img" aria-label="en">🇬🇧</span>}
                            </span>
                            {l}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}