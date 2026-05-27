import * as fs from 'fs';
import * as path from 'path';
import type { BlogPost, BlogMetadata } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getBlogPostMetadata(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  
  return files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const metadata = parseFrontmatter(raw);
    
    // Extract excerpt from content (first paragraph after frontmatter)
    const content = raw.replace(/^---[\s\S]*?---\s*/, '');
    const excerpt = content.replace(/#{1,6}\s.*?\n/, '').substring(0, 160).replace(/\*\*/g, '').trim();

    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      category: metadata.category,
      excerpt: excerpt || 'Lee este artículo...',
      image: metadata.image || '/blog/default.jpg',
      readTime: Math.ceil(content.split(/\s+/).length / 200),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  
  const raw = fs.readFileSync(file, 'utf-8');
  const metadata = parseFrontmatter(raw);
  const content = raw.replace(/^---[\s\S]*?---\s*/, '');
  const excerpt = content.replace(/#{1,6}\s.*?\n/, '').substring(0, 160).replace(/\*\*/g, '').trim();

  return {
    slug,
    title: metadata.title,
    date: metadata.date,
    category: metadata.category,
    excerpt: excerpt || 'Lee este artículo...',
    image: metadata.image || '/blog/default.jpg',
    readTime: Math.ceil(content.split(/\s+/).length / 200),
  };
}

export function getBlogPostContent(slug: string): string | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  
  const raw = fs.readFileSync(file, 'utf-8');
  return raw.replace(/^---[\s\S]*?---\s*/, '');
}

export function getCategories(): string[] {
  const posts = getBlogPostMetadata();
  const categories = Array.from(new Set(posts.map(p => p.category)));
  return categories.sort();
}

function parseFrontmatter(raw: string): BlogMetadata {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*/);
  if (!match) return { title: '', date: '', category: '', image: '' };
  
  const fm: Record<string, string> = {};
  match[1].split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(': ');
    fm[key.trim()] = valueParts.join(': ').trim();
  });
  
  return {
    title: fm.title || '',
    date: fm.date || '',
    category: fm.category || '',
    image: fm.image || '',
    excerpt: fm.excerpt || '',
  };
}
