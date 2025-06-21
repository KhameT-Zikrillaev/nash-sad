'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-[#00c853] mb-4">404</div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {t('notFound.title')}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t('notFound.description')}
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block w-full sm:w-auto px-6 py-3 bg-[#00c853] text-white font-medium rounded-md hover:bg-[#00a844] transition-colors"
          >
            {t('notFound.button')}
          </Link>
          
          <div className="text-sm text-gray-500 mt-6 pt-6 border-t border-gray-200">
            <p>{t('notFound.or_return')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
