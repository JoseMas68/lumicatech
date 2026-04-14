// SEO Configuration Store
// This stores SEO settings in a JSON file for simplicity
// In production, you'd use a database

import fs from 'fs';
import path from 'path';

const SEO_CONFIG_PATH = path.join(process.cwd(), 'data', 'seo-config.json');

export interface SeoPageConfig {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  noIndex: boolean;
  lastModified: string;
}

export interface SeoConfig {
  siteName: string;
  siteUrl: string;
  defaultOgImage: string;
  googleVerificationCode: string;
  pages: SeoPageConfig[];
  globalKeywords: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const defaultConfig: SeoConfig = {
  siteName: 'LumicaTech',
  siteUrl: 'https://lumicatech.es',
  defaultOgImage: '/og-image.png',
  googleVerificationCode: '',
  pages: [
    {
      path: '/',
      title: 'LumicaTech | Software a Medida y Desarrollo de Aplicaciones en Castellón',
      description: 'Desarrollamos software a medida para empresas en Castellón y Valencia. Aplicaciones web, sistemas de gestión, integración ERP y soluciones cloud.',
      keywords: ['software a medida', 'desarrollo software', 'Castellón', 'Valencia'],
      noIndex: false,
      lastModified: new Date().toISOString(),
    },
    {
      path: '/servicios/software-a-medida',
      title: 'Software a Medida en Castellón | Desarrollo de Aplicaciones Personalizadas',
      description: 'Desarrollamos software a medida para empresas en Castellón y Valencia. Aplicaciones web, sistemas de gestión, integración ERP y soluciones cloud.',
      keywords: ['software a medida Castellón', 'desarrollo software Valencia', 'aplicaciones web'],
      noIndex: false,
      lastModified: new Date().toISOString(),
    },
    {
      path: '/lumiware',
      title: 'Lumiware | Software de Gestión de Almacenes con QR',
      description: 'Lumiware es un software de gestión de almacenes con códigos QR, control de stock en tiempo real y generación automática de catálogos.',
      keywords: ['software almacén', 'WMS', 'control stock', 'QR', 'gestión almacén'],
      noIndex: false,
      lastModified: new Date().toISOString(),
    },
    {
      path: '/booking',
      title: 'Solicitar Diagnóstico Gratuito | LumicaTech',
      description: 'Agenda una consultoría gratuita con LumicaTech. Analizamos tus necesidades y te proponemos la mejor solución tecnológica para tu empresa.',
      keywords: ['consultoría tecnológica', 'presupuesto software', 'diagnóstico gratuito'],
      noIndex: false,
      lastModified: new Date().toISOString(),
    },
  ],
  globalKeywords: [
    'software a medida',
    'desarrollo software',
    'aplicaciones web',
    'Castellón',
    'Valencia',
    'ERP',
    'cloud',
    'LumicaTech',
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/company/lumicatech',
    twitter: 'https://twitter.com/lumicatech',
  },
};

export async function getSeoConfig(): Promise<SeoConfig> {
  try {
    if (fs.existsSync(SEO_CONFIG_PATH)) {
      const data = fs.readFileSync(SEO_CONFIG_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading SEO config:', error);
  }

  // Create directory and default config if doesn't exist
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    await saveSeoConfig(defaultConfig);
  } catch (error) {
    console.error('Error creating SEO config directory/file:', error);
  }

  return defaultConfig;
}

export async function saveSeoConfig(config: SeoConfig): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(SEO_CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error saving SEO config:', error);
    throw error;
  }
}

export async function updatePageSeo(path: string, updates: Partial<SeoPageConfig>): Promise<SeoConfig> {
  const config = await getSeoConfig();
  
  const pageIndex = config.pages.findIndex(p => p.path === path);
  if (pageIndex === -1) {
    config.pages.push({
      path,
      title: '',
      description: '',
      keywords: [],
      noIndex: false,
      lastModified: new Date().toISOString(),
      ...updates,
    });
  } else {
    config.pages[pageIndex] = {
      ...config.pages[pageIndex],
      ...updates,
      lastModified: new Date().toISOString(),
    };
  }
  
  await saveSeoConfig(config);
  return config;
}
