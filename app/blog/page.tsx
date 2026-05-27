import { getBlogPostMetadata, getCategories } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | LumicaTech — Tecnología, Software y Digitalización',
  description: 'Artículos sobre desarrollo de software, digitalización, automatización, IA y tecnología aplicada a empresas en Castellón.',
  openGraph: {
    title: 'Blog LumicaTech',
    description: 'Artículos sobre tecnología y digitalización para empresas.',
  },
};

export default function BlogPage() {
  const posts = getBlogPostMetadata();
  const categories = getCategories();

  // Group posts by category
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category === cat);
    return acc;
  }, {} as Record<string, typeof posts>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero del blog */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Artículos y Recursos
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Noticias, guías y análisis sobre desarrollo de software, digitalización, 
            automatización e inteligencia artificial para empresas.
          </p>
        </div>
      </div>

      {/* Filtros por categoría */}
      {categories.length > 1 && (
        <div className="max-w-6xl mx-auto px-6 -mt-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <span key={cat} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-200">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lista de artículos */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Próximamente</h2>
            <p className="text-gray-400">Estamos preparando los primeros artículos. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <>
            {/* Agrupados por categoría */}
            {categories.map(cat => (
              <div key={cat} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped[cat].map(post => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
