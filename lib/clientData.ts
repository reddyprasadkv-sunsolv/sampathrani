import defaultContent from '@/data/site-content.json';

export async function fetchClientContent(): Promise<any> {
  // 1. Try server API (when running in dynamic Next.js runtime)
  try {
    const res = await fetch('/api/content');
    if (res.ok) {
      const data = await res.json();
      if (data && data.siteSettings) return data;
    }
  } catch (e) {}

  // 2. Check localStorage (for static deployments like GitHub Pages)
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('sampath_site_content');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && parsed.siteSettings) return parsed;
      } catch (e) {}
    }
  }

  // 3. Fallback to bundled JSON data
  return defaultContent;
}

export async function saveClientContent(content: any): Promise<{ success: boolean; message?: string }> {
  // 1. Try server API
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('sampath_site_content', JSON.stringify(content));
        }
        return { success: true, message: 'Saved to server & database!' };
      }
    }
  } catch (e) {}

  // 2. Client-side persistence fallback (GitHub Pages)
  if (typeof window !== 'undefined') {
    localStorage.setItem('sampath_site_content', JSON.stringify(content));
    return { success: true, message: 'Changes saved & live in your browser session!' };
  }

  return { success: false, message: 'Failed to save changes.' };
}

export async function fetchClientInquiries(): Promise<any[]> {
  try {
    const res = await fetch('/api/inquiries');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {}

  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('sampath_inquiries');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
  }

  return [
    {
      id: 'inq-sample-1',
      name: 'Priya Sharma',
      email: 'priya.s@example.com',
      phone: '+91 98480 12345',
      service: 'Holistic Life Coaching (1-on-1)',
      preferredMode: 'Zoom Video',
      preferredDate: '2026-09-05',
      message: 'Looking to start life coaching and career guidance sessions.',
      status: 'New',
      createdAt: '2026-08-29T10:30:00Z'
    },
    {
      id: 'inq-sample-2',
      name: 'Vikram Reddy',
      email: 'vikram.r@example.com',
      phone: '+91 98765 43210',
      service: 'All Levels of Law of Attraction',
      preferredMode: 'In-Person (Hyderabad Studio)',
      preferredDate: '2026-09-10',
      message: 'Interested in attending the next Law of Attraction masterclass.',
      status: 'In Progress',
      createdAt: '2026-08-28T14:15:00Z'
    }
  ];
}
