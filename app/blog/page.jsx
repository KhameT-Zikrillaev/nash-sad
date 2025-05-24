export default function Blog() {
    const posts = [
      { id: 1, title: 'Первая статья', slug: 'first-post' },
      { id: 2, title: 'Вторая статья', slug: 'second-post' },
      { id: 3, title: 'Третья статья', slug: 'third-post' },
    ]
    
    return (
      <main className="min-h-screen p-24">
        <h1 className="text-4xl font-bold text-center mb-8">Наш блог</h1>
        
        <div className="max-w-2xl mx-auto space-y-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 border rounded-lg hover:bg-gray-50">
              <a href={`/blog/${post.slug}`} className="text-xl font-medium hover:text-blue-500">
                {post.title}
              </a>
            </div>
          ))}
        </div>
        
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