export default function About() {
    return (
      <main className="min-h-screen p-24">
        <h1 className="text-4xl font-bold text-center mb-8">О нас</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Мы - команда разработчиков, создающих современные веб-приложения с использованием Next.js, React и Tailwind CSS.
        </p>
        
        <div className="mt-12 flex justify-center">
          <a 
            href="/" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            На главную
          </a>
        </div>
      </main>
    )
  }