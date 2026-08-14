import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.triumworks.com.br';

/**
 * Página única: os projetos são mostrados no carrossel da home, sem rota
 * própria — por isso o sitemap tem só "/".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
