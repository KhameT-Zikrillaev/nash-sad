'use client'

import React, { useEffect } from 'react';

export default function SectionTestInstagram() {
  useEffect(() => {
    // Загружаем скрипт Instagram Embed
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Очищаем скрипт при размонтировании компонента
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Мы в Instagram</h2>
        <div className="flex justify-center">
          {/* Вставьте ваш Instagram username вместо USERNAME */}
          <div className="instagram-embed" 
               data-instgrm-permalink={`https://www.instagram.com/USERNAME`} 
               data-instgrm-version="14"
               style={{
                 background: '#FFF',
                 border: '1px solid #e1e1e1',
                 borderRadius: '8px',
                 margin: '0 auto',
                 maxWidth: '540px',
                 width: '100%',
                 height: '500px',
                 overflow: 'hidden'
               }}>
          </div>
        </div>
        <div className="text-center mt-6">
          <a 
            href="https://www.instagram.com/USERNAME/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            Подписаться
          </a>
        </div>
      </div>
    </section>
  );
}
