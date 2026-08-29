import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent } from '@/lib/contentStore';

export async function GET() {
  try {
    const content = getSiteContent();
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid content payload' }, { status: 400 });
    }

    const success = saveSiteContent(body);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error saving content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  return POST(request);
}
