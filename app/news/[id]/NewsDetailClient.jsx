'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import  image1 from '@/public/images/24.png'
import  image2 from '@/public/images/24.png'
export default function NewsDetailClient() {
  const { id } = useParams()
  const [newsItem, setNewsItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Моковые данные - в реальном приложении здесь будет запрос к API
    const mockNews = [
      {
        id: '1',
        title: 'Заголовок новости 1',
        content: 'Полное описание новости 1. Здесь будет развернутый текст новости со всеми деталями. ' +
                 'Вы можете добавить столько текста, сколько нужно для полного описания новости.\n\n' +
                 'Второй абзац с дополнительной информацией о новости. Этот текст демонстрирует, ' +
                 'как будет выглядеть многострочный контент на странице новости.',
        date: '15 июня 2024',
        imageUrl: image1
      },
      {
        id: '2',
        title: 'Заголовок новости 2',
        content: 'Полное описание новости 2. Этот текст показывает, как будет выглядеть вторая новость.\n\n' +
                 'Дополнительная информация о второй новости. Вы можете добавить сюда любые детали, ' +
                 'которые считаете важными для ваших читателей.',
        date: '10 июня 2024',
        imageUrl: image2
      },
      {
        id: '3',
        title: 'Заголовок новости 1',
        content: 'Полное описание новости 1. Здесь будет развернутый текст новости со всеми деталями. ' +
                 'Вы можете добавить столько текста, сколько нужно для полного описания новости.\n\n' +
                 'Второй абзац с дополнительной информацией о новости. Этот текст демонстрирует, ' +
                 'как будет выглядеть многострочный контент на странице новости.',
        date: '15 июня 2024',
        imageUrl: image1
      },
      {
        id: '4',
        title: 'Заголовок новости 2',
        content: 'Полное описание новости 2. Этот текст показывает, как будет выглядеть вторая новость.\n\n' +
                 'Дополнительная информация о второй новости. Вы можете добавить сюда любые детали, ' +
                 'которые считаете важными для ваших читателей.',
        date: '10 июня 2024',
        imageUrl: image2
      }
      
    ]

    const item = mockNews.find(item => item.id === id)
    
    // Имитация задержки загрузки
    const timer = setTimeout(() => {
      setNewsItem(item || null)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen md:mt-[164px] mt-[80px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen md:mt-[164px] mt-[80px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Новость не найдена</h1>
          <p className="text-gray-600 mb-6">К сожалению, запрашиваемая новость не найдена или была удалена.</p>
          <Link 
            href="/news" 
            className="inline-block bg-[#32ba4e] text-white px-6 py-2 rounded-lg hover:bg-[#2aa441] transition-colors"
          >
            Вернуться к списку новостей
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen md:mt-[180px]  lg:mt-[200px] xl:mt-[164px] mt-[80px] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/news" 
          className="inline-flex items-center text-[#32ba4e] mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Назад к списку новостей
        </Link>
        
        <article className=" rounded-xl overflow-hidden">
          <div className="w-full h-64 md:h-96 relative">
            <Image
              src={newsItem.imageUrl}
              alt={newsItem.title}
              width={800}
              height={450}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          
          <div className="">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 my-2">
              {newsItem.title}
            </h1>
            
            <div className="prose max-w-none text-gray-700">
              {newsItem.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
