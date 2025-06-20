'use client';

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image'
import leftabstrack from '@/public/images/left-abstrack.webp'
import righta1bstrack from '@/public/images/right-1-abstrack.webp'
import righta2bstrack from '@/public/images/right-2-abstrack.webp'
import { IoMdClose } from 'react-icons/io';

export default function ContactPage() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Create a formatted message with all form fields
    let message = '';
    for (const [key, value] of Object.entries(data)) {
      message += `${key}: ${value}\n`;
    }
    
    // Show alert with form data
    alert(message);
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <>
     <div className='contactpage relative overflow-hidden p-2 mt-[10%]  md:mt-[90px]  lg:mt-[50px]'>

        <Image className='absolute max-w-[500px] z-0  bottom-[20%] opacity-80 lg:opacity-100 md:bottom-0 left-[-400px] md:left-[-350px]' src={leftabstrack} alt="leftabstrack" />
        <Image className='absolute max-w-[500px] z-0 bottom-[-15%] opacity-80 lg:opacity-100 right-[-350px]' src={righta1bstrack} alt="righta1bstrack" />
        <Image className='absolute max-w-[500px] z-0 top-[-20%] opacity-80 lg:opacity-100 right-[-400px] md:right-[-350px]' src={righta2bstrack} alt="righta2bstrack" />
         <div className=" relative  z-10 max-w-[1000px] w-full mx-auto">
            {/* ~~~~~~~~~~~~~ */}
         <div className="section-adress  flex flex-col md:flex-row gap-1 md:gap-12">
          <div className="section-adress-left">
             <h3 className='text-[#19B04A] text-center md:text-left tracking-wide  font-semibold md:text-2xl'>{t('contact.address_title')}</h3>
             <p className='md:text-xl text-center md:text-left tracking-wide ' dangerouslySetInnerHTML={{ __html: t('contact.address') }} />
          </div>
          <div className="section-adress-right">
                <h3 className='text-[#19B04A] text-center md:text-left tracking-wide font-semibold md:text-2xl'>{t('contact.phone_title')}</h3>
                <p className='md:text-xl text-center md:text-left tracking-wide '>{t('contact.phone')}</p>
            </div>

         </div>
         {/* ~~~~~~~~~~~~~ */}
         <form ref={formRef} onSubmit={handleSubmit} className='mt-[10px] md:mt-[15px] px-6 md:px-2'>
            <h2 className='text-[#00c853] tracking-wide font-bold text-center md:text-left md:text-2xl'>{t('contact.form_title')}</h2>
            <div className="form-content grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 md:mt-[20px] mt-[5px]">
                {/* ~~~~~~~~~~~~~~~~~~name */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="name">{t('contact.form.name')}</label>
                 <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="text" 
                  name="name"
                  placeholder={t('contact.form.name_placeholder')}
                  required 
                />
            </div>
                {/* ~~~~~~~~~~~~~~~~~~telephone */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="phone">{t('contact.form.phone')}</label>
                <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="tel" 
                  name="phone"
                  placeholder={t('contact.form.phone_placeholder')}
                  pattern="[+]?[0-9]{12}"
                  title={t('contact.form.phone_validation', 'Please enter a valid phone number')}
                  required 
                />
            </div>
            {/* ~~~~~~~~~~~~~~~~~~email */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="email">{t('contact.form.email')}</label>
                <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="email" 
                  name="email"
                  placeholder={t('contact.form.email_placeholder')}
                  required 
                />
            </div>
            {/* ~~~~~~~~~~~~~~~~~~address */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="subject">{t('contact.form.subject')}</label>
                <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="text" 
                  name="subject"
                  placeholder={t('contact.form.subject_placeholder')}
                  required 
                />
            </div>
            </div>

            <div className="form-group text-sm md:text-base  mt-[10px] md:mt-[20px] flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="message">{t('contact.form.message')}</label>
                <textarea 
                  className='md:p-3 p-2 bg-gray-100 outline-none rounded-md w-full' 
                  placeholder={t('contact.form.message_placeholder')} 
                  required
                />
            </div>
           <div className="flex flex-col md:flex-row  mt-[10px] md:mt-[30px] items-center gap-2">
           <button type="submit" className='bg-[#19B04A] text-sm md:text-md text-white font-semibold py-2 px-4 rounded-full tracking-wider'>{t('contact.form.submit')}</button>
           <p className="text-md tracking-wide text-center md:text-left px-2 md:px-0">
             {t('contact.form.consent')}
             <button type="button" className="text-[#00c853] font-semibold">{t('contact.form.consent_button')}</button>
           </p>
           </div>
         </form>
         
         </div>
     </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.success.title')}</h3>
              <p className="text-gray-600">{t('contact.success.message')}</p>
            </div>
          </div>
        </div>
      )}
     </>
  )
}
