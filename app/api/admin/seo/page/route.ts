import { NextRequest, NextResponse } from 'next/server';
import { updatePageSeo } from '@/src/lib/seo-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, ...updates } = body;

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const config = await updatePageSeo(path, updates);
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error updating page SEO:', error);
    return NextResponse.json({ error: 'Failed to update page SEO' }, { status: 500 });
  }
}
