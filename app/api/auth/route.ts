import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/contentStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    const content = getSiteContent();
    const expectedPin = content?.siteSettings?.adminPin || 'admin123';

    if (pin && pin.trim() === expectedPin.trim()) {
      return NextResponse.json({
        success: true,
        token: `adm_${Date.now()}_auth_valid`,
        message: 'Authentication successful'
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid Admin PIN/Password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication error' }, { status: 500 });
  }
}
