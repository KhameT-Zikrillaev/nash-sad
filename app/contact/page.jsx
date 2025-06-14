
'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import leftabstrack from '@/public/images/left-abstrack.webp'
import righta1bstrack from '@/public/images/right-1-abstrack.webp'
import righta2bstrack from '@/public/images/right-2-abstrack.webp'
import { IoMdClose } from 'react-icons/io';
export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log('Form submitted:', formValues);
    
    // Here you can add your form submission logic, e.g., send to an API
    // For example:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(formValues),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // Reset form
    if (formRef.current) {
      formRef.current.reset();
    }
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
     <div className='contactpage relative overflow-hidden p-2   mt-[120px] md:mt-[180px]  lg:mt-[200px] xl:mt-[164px]'>

        <Image className='absolute max-w-[500px] z-0  bottom-[20%] opacity-80 lg:opacity-100 md:bottom-0 left-[-400px] md:left-[-350px]' src={leftabstrack} alt="leftabstrack" />
        <Image className='absolute max-w-[500px] z-0 bottom-[-15%] opacity-80 lg:opacity-100 right-[-350px]' src={righta1bstrack} alt="righta1bstrack" />
        <Image className='absolute max-w-[500px] z-0 top-[-20%] opacity-80 lg:opacity-100 right-[-400px] md:right-[-350px]' src={righta2bstrack} alt="righta2bstrack" />
         <div className=" relative  z-10 max-w-[1000px] w-full mx-auto">
            {/* ~~~~~~~~~~~~~ */}
         <div className="section-adress pt-[20px] flex flex-col md:flex-row gap-1 md:gap-12">
          <div className="section-adress-left">
             <h3 className='text-[#19B04A] text-center md:text-left tracking-wide  font-semibold md:text-2xl'>Manzil:</h3>
             <p className='md:text-xl text-center md:text-left tracking-wide '>O'zbekiston Respublikasi, Namangan viloyati, <br/> Namangan t-ni, Mirishkor QFY</p>
          </div>
          <div className="section-adress-right">
                <h3 className='text-[#19B04A] text-center md:text-left tracking-wide font-semibold md:text-2xl'>Telefon:</h3>
                <p className='md:text-xl text-center md:text-left tracking-wide '>+998 99 999 99 99</p>
            </div>

         </div>
         {/* ~~~~~~~~~~~~~ */}
         <form ref={formRef} onSubmit={handleSubmit} className='mt-[10px] md:mt-[50px] px-6 md:px-2'>
            <h2 className='text-[#00c853] tracking-wide  font-bold text-center md:text-left md:text-2xl'>Bizga murojaat yo'llash:</h2>
            <div className="form-content grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 md:mt-[20px] mt-[5px]">
                {/* ~~~~~~~~~~~~~~~~~~name */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="name">Ismingiz</label>
                 <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="text" 
                  name="name"
                  placeholder="Ismingizni ko'rsating" 
                  required 
                />
            </div>
                {/* ~~~~~~~~~~~~~~~~~~telephone */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="surname">Telefon raqamingiz</label>
                <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="tel" 
                  name="phone"
                  placeholder="+99899 999 99 99" 
                  pattern="[+]?[0-9]{12}"
                  title="Пожалуйста, введите корректный номер телефона"
                  required 
                />
            </div>
            {/* ~~~~~~~~~~~~~~~~~~email */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="email">Elektron pochta</label>
                <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="email" 
                  name="email"
                  placeholder="example@mail.com" 
                  required 
                />
            </div>
            {/* ~~~~~~~~~~~~~~~~~~address */}
            <div className="form-group text-sm md:text-base flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="address">Murojaat mavsuzi</label>
                <input 
                  className='md:p-3 p-2 bg-gray-100 rounded-md' 
                  type="text" 
                  name="subject"
                  placeholder="Murojaat mavsuzi" 
                  required 
                />
            </div>
            </div>

            <div className="form-group text-sm md:text-base  mt-[10px] md:mt-[20px] flex flex-col gap-2">
                <label className='font-semibold text-center md:text-left' htmlFor="message">Murojaat</label>
                <textarea className='md:p-3 p-2 bg-gray-100 outline-none  rounded-md ' placeholder="Sizning xabaringizr" required/>
            </div>
           <div className="flex flex-col md:flex-row  mt-[10px] md:mt-[30px] items-center gap-2">
           <button type="submit" className='bg-[#19B04A] text-sm md:text-md text-white font-semibold py-2 px-4 rounded-full tracking-wider'>JO'NATISH</button>
           <p className="text-md tracking-wide text-center md:text-left px-2 md:px-0">Jo'natish orqali men shaxsiy ma'limotlarni qayta ishlashlariga <button className="text-[#00c853] font-semibold">rozilik bildiraman</button></p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Muvaffaqiyatli yuborildi!</h3>
              <p className="text-gray-600">Sizning xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.</p>
            </div>
          </div>
        </div>
      )}
     </>
  )
}
