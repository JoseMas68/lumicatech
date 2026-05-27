import BlogPostContent from '@/components/blog/BlogPostContent';
import { getBlogPostBySlug, getBlogPostContent, getBlogPostMetadata } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPostMetadata();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | Blog LumicaTech`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const content = getBlogPostContent(slug);
  
  if (!post || !content) notFound();

  const allPosts = getBlogPostMetadata().filter(p => p.slug !== slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero del artículo */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
              {post.category}
            </span>
            <span className="text-gray-300 text-sm">{post.date}</span>
            <span className="text-gray-400 text-sm">• {post.readTime} min lectura</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        <article className="prose prose-lg max-w-none">
          <BlogPostContent content={content} />
        </article>

        {/* Compartir */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Compartir este artículo</h3>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Twitter
            </button>
            <button className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 transition-colors">
              LinkedIn
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              Copiar enlace
            </button>
          </div>
        </div>
      </div>

      {/* Artículos relacionados */}
      {allPosts.length > 0 && (
        <div className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Artículos relacionados</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPosts.slice(0, 3).map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-3">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-cyan-500 text-xs font-semibold uppercase">{p.category}</span>
                  <h3 className="text-gray-800 font-semibold mt-1 group-hover:text-cyan-500 transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{p.date} • {p.readTime} min</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
