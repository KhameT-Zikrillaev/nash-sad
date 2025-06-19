import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CardNews = ({ id, title, description, date, imageUrl }) => {
  const { t } = useTranslation();
  return (
    <motion.div 
      className="rounded-xl  overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5 }}
    >
      {/* Image Section - Full width at the top */}
      <div className="w-full h-[250px]  md:h-[300px] lg:h-[350px] relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain rounded-xl"
        />
      </div>
      
      {/* Content Section - Takes remaining space */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow overflow-hidden text-ellipsis">
          {description}
        </p>
        
        {/* Footer with button and date */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <Link 
  href={`/news/${id}`} 
  className="text-[#32ba4e] font-medium hover:underline flex items-center"
  passHref
>
  <motion.span 
    className="flex items-center"
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    {t('news.read_more')}
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </motion.span>
</Link>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CardNews;