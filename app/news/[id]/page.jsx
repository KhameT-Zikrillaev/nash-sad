import NewsDetailClient from './NewsDetailClient'

// Указываем, какие ID новостей нужно предварительно сгенерировать
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ]
}

export default function NewsDetailPage() {
  return <NewsDetailClient />
}