export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: number;
}

export interface BlogMetadata {
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt?: string;
}
