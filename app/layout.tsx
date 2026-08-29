import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppConcierge from '@/components/WhatsAppConcierge';
import BookingModal from '@/components/BookingModal';
import { getSiteContent } from '@/lib/contentStore';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const content = getSiteContent();
  const settings = content?.siteSettings;

  return {
    metadataBase: new URL('https://sampathrani.com'),
    title: settings?.title || 'Dr. Sampath Rani | Holistic Life Coach & Author',
    description: settings?.tagline || 'Discover your true self – Incredible journey of Self healing with Dr. Sampath Rani Momula.',
    keywords: [
      'Dr Sampath Rani',
      'Life Coach Hyderabad',
      'Holistic Life Coach',
      'Law of Attraction Trainer',
      'The Doorway to Your Dreams',
      'Chakra Healing',
      'Bach Flower Remedies',
      'ESES Academy'
    ],
    authors: [{ name: 'Dr. Sampath Rani Momula' }],
    openGraph: {
      title: settings?.title || 'Dr. Sampath Rani | Holistic Life Coach & Author',
      description: settings?.tagline || 'The Power is Within You!',
      url: 'https://sampathrani.com',
      siteName: 'Dr. Sampath Rani - Life Coach',
      images: [
        {
          url: '/images/welcome.jpg',
          width: 1200,
          height: 630,
          alt: 'Dr. Sampath Rani Momula',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    icons: {
      icon: '/images/logo.png',
      apple: '/images/logo.png',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#4A3E35] antialiased selection:bg-[#D5BDAF]/40 selection:text-[#261E18]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppConcierge />
        <BookingModal />
      </body>
    </html>
  );
}
