'use client'
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import logowhite from '@/public/images/logowhite.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Языки с правильными кодами для i18next
  const LANGS = [
    { code: 'uz', name: 'UZ', flag: '🇺🇿' },
    { code: 'ru', name: 'RU', flag: '🇷🇺' },
    { code: 'en', name: 'EN', flag: '🇬🇧' }
  ];

  // Текущий язык (синхронизирован с i18n)
  const [currentLang, setCurrentLang] = useState(
    LANGS.find(l => l.code === i18n.language) || LANGS[0]
  );

  // Синхронизация при изменении языка
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      const newLang = LANGS.find(l => l.code === lng) || LANGS[0];
      setCurrentLang(newLang);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Пункты меню
  const menuItems = [
    { id: 'production', text: t('menu.production'), path: '/production', delay: 0.4 },
    { id: 'products', text: t('menu.products'), path: '/products', delay: 0.5 },
    { id: 'news', text: t('menu.news'), path: '/news', delay: 0.6 },
    { id: 'contact', text: t('menu.contact'), path: '/contact', delay: 0.7 }
  ];

  // Анимации
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative z-50 w-full ${isHomePage ? 'bg-[#00c853] shadow-xl border-b-[2px] border-blue-200/10' : 'bg-transparent'}  border-blue-200/10`}>
      
      <div className="container relative z-10 h-[80px] md:h-auto mx-auto px-0 py-2  flex flex-col items-center">
        {/* Логотип */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="font-bold absolute md:static text-2xl text-white pt-3 mt-0 md:pt-0 md:mt-4 md:mb-2 select-none text-center"
        >
          <Link href="/">
            <Image className='w-[60px]' src={logowhite} alt="logo" />
          </Link>
        </motion.div>

        {/* Десктопное меню */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full flex-row items-center justify-center hidden md:flex relative"
        >
          <motion.ul className="flex gap-12 font-semibold text-white text-base">
            {menuItems.map((menuItem, index) => (
              <motion.li
                key={menuItem.id}
                variants={item}
                transition={{ delay: menuItem.delay }}
                className={`relative transition cursor-pointer  rounded-lg ${
                  pathname === menuItem.path 
                    ? 'bg-[#0f7a36] text-white shadow-lg  border-white/30' 
                    : 'text-white/90 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={menuItem.path} className="block px-2 py-1">
                  {menuItem.text}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Языковой переключатель (десктоп) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="ml-10 relative select-none"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 justify-center bg-[#159143] text-white font-bold rounded-full w-12 h-10 shadow-lg text-base px-2 focus:outline-none transition-all duration-200 border-2 border-transparent hover:border-[#32ba4e]"
              onClick={() => setLangOpen((v) => !v)}
              tabIndex={0}
              aria-label={t('language_selector')}
            >
              <svg className="w-5 h-5 mr-1 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="#159143" />
                <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="#fff" strokeWidth="1.2" />
              </svg>
              <span>{currentLang.name}</span>
              <svg className={`w-3 h-3 ml-1 transform transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-28 bg-white rounded-xl shadow-2xl z-30 py-1 ring-1 ring-[#159143]/10"
                  onMouseLeave={() => setLangOpen(false)}
                >
                  {LANGS.map((l) => (
                    <motion.li
                      key={l.code}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex items-center gap-2 px-4 py-2 text-base cursor-pointer transition font-semibold rounded-lg min-h-[40px] h-full w-full"
                        ${i18n.language === l.code ? 'bg-[#32ba4e] text-white shadow' : 'text-[#159143] hover:bg-[#eafbee]'}`}
                      onClick={() => {
                        i18n.changeLanguage(l.code);
                        setLangOpen(false);
                      }}
                    >
                      <span className="inline-block w-4 h-4 mr-1">{l.flag}</span>
                      {l.name}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Мобильное меню */}
        <div className="w-full flex items-center justify-between md:hidden">
          <div></div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`relative z-50 top-[40%] right-2 flex items-center justify-center w-8 h-8 rounded-sm bg-[#00c853] shadow-lg focus:outline-none transition-all duration-200 group ${menuOpen ? 'ring-2 ring-[#32ba4e]/70' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('close_menu') : t('open_menu')}
          >
            <span className={`absolute block h-[3px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-[25%] left-1/2 -translate-x-1/2'}`}></span>
            <span className={`absolute block h-[3px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}`}></span>
            <span className={`absolute block h-[3px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-[70%] left-1/2 -translate-x-1/2'}`}></span>
          </motion.button>
        </div>

        {/* Мобильное меню (анимация) */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed  inset-0 bg-black/40 z-50"
                onClick={() => setMenuOpen(false)}
              ></motion.div>
              
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full w-[80vw] max-w-xs bg-[#32ba4e] z-50 flex flex-col pt-28 pb-10 px-6 font-semibold text-white text-lg shadow-2xl rounded-tr-3xl rounded-br-3xl md:hidden"
              >
                <motion.ul className="flex flex-col gap-2">
                  {menuItems.map((menuItem, index) => (
                    <motion.li
                      key={menuItem.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className={`transition cursor-pointer py-4 pl-10 pr-2 hover:bg-white/10 font-bold text-xl border-b border-white/30 ${
                        pathname === menuItem.path 
                          ? 'text-white bg-white/20' 
                          : 'text-white/90 hover:text-white'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Link href={menuItem.path} className="block w-full">
                        {menuItem.text}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Языковой переключатель (мобильная версия) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 justify-center bg-[#159143] text-white font-bold rounded-full w-24 h-12 shadow-lg text-base px-2 focus:outline-none transition-all duration-200 border-2 border-transparent hover:border-[#32ba4e] mx-auto"
                    onClick={() => setLangOpen((v) => !v)}
                    tabIndex={0}
                    aria-label={t('language_selector')}
                  >
                    <svg className="w-5 h-5 mr-1 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="#159143" />
                      <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="#fff" strokeWidth="1.2" />
                    </svg>
                    <span>{currentLang.name}</span>
                    <svg className={`w-3 h-3 ml-1 transform transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
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
                            key={l.code}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`flex items-center gap-2 px-4 py-2 text-base cursor-pointer transition font-semibold rounded-lg
                              ${i18n.language === l.code ? 'bg-[#32ba4e] text-white shadow' : 'text-[#159143] hover:bg-[#eafbee]'}`}
                            onClick={() => {
                              i18n.changeLanguage(l.code);
                              setLangOpen(false);
                            }}
                          >
                            <span className="inline-block w-4 h-4 mr-1">{l.flag}</span>
                            {l.name}
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
   {!isHomePage && (
     <motion.div 
       initial={{ y: -100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
       className='absolute z-0 top-0 w-full'>
       <div className='max-w-[1920px]  mx-auto overflow-hidden lg:mt-[-50px] xl:mt-[-140px] custom-hero-margin'>
         <svg viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
           <path
             fill="#00c853"
             d="M0,0 H1440 V200 C1440,200 1080,300 720,300 C360,300 0,200 0,200 Z"
           />
         </svg>
       </div>
     </motion.div>
   )}
    </motion.nav>
  );
}