import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent, getInquiries } from '@/lib/contentStore';

export async function GET() {
  try {
    const content = getSiteContent();
    const inquiries = getInquiries();
    const backup = {
      exportedAt: new Date().toISOString(),
      siteContent: content,
      inquiries: inquiries
    };
    return NextResponse.json(backup);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate backup' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || !body.siteContent) {
      return NextResponse.json({ error: 'Invalid backup file structure' }, { status: 400 });
    }

    const success = saveSiteContent(body.siteContent);
    if (!success) {
      return NextResponse.json({ error: 'Failed to restore site content' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Data backup restored successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error restoring backup' }, { status: 500 });
  }
}
