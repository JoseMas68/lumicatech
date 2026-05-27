import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-cyan-200">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min lectura</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-500 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  );
}
