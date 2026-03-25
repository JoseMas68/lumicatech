import { MetadataRoute } from 'next'
import { getSeoConfig } from '@/src/lib/seo-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getSeoConfig()
  const baseUrl = config.siteUrl

  // Filter pages that are indexable
  const indexablePages = config.pages.filter(page => !page.noIndex)

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Dynamic pages from SEO config
    ...indexablePages
      .filter(page => page.path !== '/')
      .map(page => ({
        url: `${baseUrl}${page.path}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: 'weekly' as const,
        priority: page.path.startsWith('/servicios') ? 0.9 : 0.8,
      })),
    // Static pages
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
