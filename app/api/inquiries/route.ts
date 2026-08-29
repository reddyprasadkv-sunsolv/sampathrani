import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, saveInquiry, updateInquiryStatus, deleteInquiry } from '@/lib/contentStore';

export async function GET() {
  try {
    const inquiries = getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, preferredMode, preferredDate, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Name, phone and message are required' }, { status: 400 });
    }

    const saved = saveInquiry({
      name,
      email: email || '',
      phone,
      service: service || 'General Consultation',
      preferredMode: preferredMode || 'Zoom Online',
      preferredDate: preferredDate || '',
      message
    });

    if (!saved) {
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true, inquiry: saved, message: 'Inquiry submitted successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error processing inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const updated = updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found or could not be updated' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error updating status' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    const deleted = deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error deleting inquiry' }, { status: 500 });
  }
}
