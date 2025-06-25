'use client'

import React from 'react'
import footerbg from '@/public/images/footerbg.png'
import footerfruitphoto from '@/public/images/footerfruitphoto.webp'
import logogreen from '@/public/images/logogreen.png'
import callphoto from '@/public/images/callphoto.png'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const { t} = useTranslation();
  const pathname = usePathname()

  // Анимация для фрукта (теперь сверху вниз)
  const fruitAnimations = {
    hidden: { 
      opacity: 0, 
      y: -250, 
      rotate: 15,
      scale: 0.7
    },
    visible: {
      opacity: 1, 
      y: 0, 
      rotate: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 570, 
        damping: 12,
        delay: 1,
        mass: 0.8
      }
    }
  }

  // Анимация для основной карточки


  // Анимация для элементов внутри карточки
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.15,
        duration: 0.6
      }
    })
  }

  // Анимация для фонового изображения
  const bgAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  // Анимация для нижнего меню
  const menuAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.8,
        duration: 0.6
      }
    }
  }

  return (
    <>
      <footer id='contact' className='footer relative w-full -mt-[300px]'>
        {/* Анимированный фрукт с новой анимацией сверху вниз */}
        {pathname === '/' && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}  // Изменено на false для повторной анимации
            variants={fruitAnimations}
            className='absolute  -mt-[120px] sm:-mt-[100px] z-10 md:-mt-[160px] w-[160px] sm:w-[250px]  left-[calc(50%-80px)] sm:left-[-2%] md:left-[4%] lg:left-[5%] xl:left-[9%] sm:top-[55px] md:top-[125px] xl:top-[125px] z-0'
          >
            <Image 
              src={footerfruitphoto} 
              alt="section4photo" 
              className='w-full h-auto'
              priority
            />
          </motion.div>
        )}

        {/* Основная карточка с анимацией */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}  // Изменено на false
        
          className="w-[90%] relative z-50 mb-16 sm:mb-0 sm:max-w-[600px] mx-auto  px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-center relative z-10 overflow-hidden"
        >
    
          
          {/* Левая часть */}
          <motion.div 
            className="flex flex-col items-center md:items-start gap-3 relative"
            custom={0}
            variants={itemAnimation}
          >
            <motion.div 
              className="flex items-center gap-3 p-2 sm:p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              custom={1}
              variants={itemAnimation}
            >
              <div className="relative">
                <Image className='w-[50px]' src={callphoto} alt="callphoto" />
                <motion.div 
                  className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <div>
                <div className="text-green-700 font-bold text-xs sm:text-sm leading-tight tracking-wider">{t('footer.contact_for_inquiries')}</div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 font-black text-xl sm:text-2xl">
                  +998 <span className="text-2xl sm:text-3xl">77 000 00 00</span>
                </div>
              </div>
            </motion.div>
            
            <Link className='cursor-pointer mt-[25px]' href="/contact">
              <motion.button 
                className="mt-2 cursor-pointer relative bg-white md:bg-transparent overflow-hidden group border-2 border-green-500 rounded-full px-6 sm:px-8 py-1 sm:py-2 text-green-600 font-bold hover:text-green-800 transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                custom={2}
                variants={itemAnimation}
              >
                <span className="cursor-pointer relative z-10">{t('footer.contact')}</span>
                <motion.span 
                  className="absolute cursor-pointer inset-0 w-full h-full bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-full group-hover:translate-x-0"
                  initial={{ x: '-100%' }}
                />
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Правая часть */}
          <motion.div 
            className="mt-6 md:mt-0 flex items-center relative"
            custom={3}
            variants={itemAnimation}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image className='w-[100px]' src={logogreen} alt="logo" />
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 right-0 w-full h-2 bg-green-500/20 rounded-full blur-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Десктопное меню */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}  // Изменено на false
          variants={menuAnimation}
          className="w-[90%] hidden md:flex bg-white md:bg-transparent sm:max-w-[600px] mx-auto w-full px-4 sm:px-6 py-3 flex justify-between items-center text-green-600 relative z-10 mt-2"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className='text-green-700 font-bold text-xs sm:text-sm tracking-wide flex items-center'
          >
            <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            © NASH SAD 2020 – {new Date().getFullYear()}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className='text-green-700 font-bold text-xs sm:text-sm tracking-wide hover:text-green-800 transition-colors cursor-pointer flex items-center'
          >
            <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.115l-.78 2.77 3.116-1.65c.88.275 1.823.425 2.775.425 4.97 0 9-3.186 9-7.115C21 6.186 16.97 3 12 3zm0 12c-.825 0-1.63-.125-2.39-.355l-.67-.18-.585.31-.715-.38.18-.67-.18-.67C7.2 11.6 7 10.38 7 9.115 7 6.814 9.239 5 12 5s5 1.814 5 4.115c0 2.3-2.239 4.115-5 4.115z"/>
            </svg>
            {t('footer.privacy_policy')}
          </motion.span>
        </motion.div>

        {/* Фоновое изображение */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}  // Изменено на false
          variants={bgAnimation}
          className="relative w-full mt-[-400px] sm:mt-[-50px] overflow-hidden h-[50vh] sm:h-auto"
        >
          <Image 
            className='footer-bg w-full h-full object-cover object-center-top' 
            src={footerbg} 
            alt="footerbg" 
            priority
          />
        </motion.div>

        {/* Мобильное меню */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}  // Изменено на false
          variants={menuAnimation}
          className="w-[90%] md:hidden bg-white sm:max-w-[600px] mx-auto w-full px-4 sm:px-6 py-3 flex justify-between items-center text-green-600 relative z-10 mt-2"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className='text-green-700 font-bold text-xs sm:text-sm tracking-wide flex items-center'
          >
            <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            © NASH SAD 2020 – {new Date().getFullYear()}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className='text-green-700 font-bold text-xs sm:text-sm tracking-wide hover:text-green-800 transition-colors cursor-pointer flex items-center'
          >
            <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.115l-.78 2.77 3.116-1.65c.88.275 1.823.425 2.775.425 4.97 0 9-3.186 9-7.115C21 6.186 16.97 3 12 3zm0 12c-.825 0-1.63-.125-2.39-.355l-.67-.18-.585.31-.715-.38.18-.67-.18-.67C7.2 11.6 7 10.38 7 9.115 7 6.814 9.239 5 12 5s5 1.814 5 4.115c0 2.3-2.239 4.115-5 4.115z"/>
            </svg>
            {t('footer.privacy_policy')}
          </motion.span>
        </motion.div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 10s ease-in-out infinite 2s;
        }
        .perspective-500 {
          perspective: 500px;
        }
        .rotate-x-5 {
          transform: rotateX(5deg);
        }
      `}</style>
    </>
  )
}