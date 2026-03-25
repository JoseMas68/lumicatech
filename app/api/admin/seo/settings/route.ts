import { NextRequest, NextResponse } from 'next/server';
import { getSeoConfig, saveSeoConfig, SeoConfig } from '@/src/lib/seo-config';

export async function POST(request: NextRequest) {
  try {
    const updates = await request.json() as Partial<SeoConfig>;
    
    const currentConfig = await getSeoConfig();
    const newConfig = { ...currentConfig, ...updates };
    
    await saveSeoConfig(newConfig);
    return NextResponse.json(newConfig);
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    return NextResponse.json({ error: 'Failed to update SEO settings' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const config = await getSeoConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error getting SEO config:', error);
    return NextResponse.json({ error: 'Failed to get SEO config' }, { status: 500 });
  }
}
