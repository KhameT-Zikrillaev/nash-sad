'use client';

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image'
import leftabstrack from '@/public/images/left-abstrack.webp'
import righta1bstrack from '@/public/images/right-1-abstrack.webp'
import righta2bstrack from '@/public/images/right-2-abstrack.webp'
import { IoMdClose } from 'react-icons/io';
import api from '@/lib/api';
export default function ContactPage() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    setErrorMessage('');
    
    try {
      // Get form data
      const formData = new FormData(e.target);
      const data = {
        firstName: formData.get('name'), // assuming your input name is 'name' in the form
        phone: formData.get('phone'),
        email: formData.get('email'),
        title: formData.get('subject'), // assuming your input name is 'subject' in the form
        text: formData.get('message')    // assuming your textarea name is 'message' in the form
      };
      
      // Send data to API
      const response = await api?.post('/contacts', data);
      
      if (response?.status >= 200 && response?.status < 300) {
        setShowSuccess(true);
        formRef?.current?.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to submit the form');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      const message = err.response?.data?.message || 
                    err.message || 
                    t('form.submitError') || 
                    'Ошибка при отправке. Пожалуйста, попробуйте снова.';
      
      setErrorMessage(message);
      setShowError(true);
      
      // Скрыть сообщение об ошибке через 5 секунд
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
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
                  name="message"
                  placeholder={t('contact.form.message_placeholder')} 
                  required
                />
            </div>
           <div className="flex flex-col md:flex-row  mt-[10px] md:mt-[30px] items-center gap-2">
           <button type="submit" className='bg-[#19B04A] text-sm md:text-md text-white font-semibold py-2 px-4 rounded-full tracking-wider'>{t('contact.form.submit')}</button>
           <p className="text-md tracking-wide text-center md:text-left px-2 md:px-0">
             {t('contact.form.consent')}
             <button 
               type="button" 
               className="text-[#00c853] font-semibold hover:underline"
               onClick={() => setShowTerms(true)}
             >
               {t('contact.form.consent_button')}
             </button>
           </p>
           </div>
         </form>
         
         </div>
     </div>

      {/* Success Modal */}
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

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('contact.terms.title')}
              </h3>
            </div>
            <div className="prose max-w-none">
              {t('contact.terms.sections', { returnObjects: true }).map((section, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    {section.title}
                  </h4>
                  <p className="text-gray-600">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="px-4 py-2 bg-[#19B04A] text-white rounded-full hover:bg-[#158a3d] transition-colors"
              >
                {t('contact.terms.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button 
              onClick={() => setShowError(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ошибка</h3>
              <p className="text-gray-600">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
     </>
  )
}
