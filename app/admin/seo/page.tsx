import { Metadata } from 'next';
import { getSeoConfig } from '@/src/lib/seo-config';
import SeoDashboardClient from './components/SeoDashboardClient';

export const metadata: Metadata = {
  title: 'Panel SEO | LumicaTech Admin',
  description: 'Gestión de SEO para LumicaTech',
};

export default async function SeoDashboardPage() {
  const config = await getSeoConfig();
  return <SeoDashboardClient initialConfig={config} />;
}
