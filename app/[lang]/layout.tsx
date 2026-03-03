import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { locales, type Locale } from '@/i18n/config';
import ClientOnly from '@/components/ClientOnly';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const { lang } = params;

  return {
    title: {
      default: lang === 'en' ? 'ESTAYA - Luxury Real Estate in Morocco' :
              lang === 'fr' ? 'ESTAYA - Immobilier de Luxe au Maroc' :
              'ESTAYA - عقارات فاخرة في المغرب',
      template: lang === 'en' ? '%s | ESTAYA Morocco' :
                lang === 'fr' ? '%s | ESTAYA Maroc' :
                '%s | ESTAYA المغرب',
    },
    description: lang === 'en' ? 'Discover exceptional properties in Morocco. Buy, sell, and rent luxury apartments, villas, and commercial spaces.' :
                lang === 'fr' ? 'Découvrez des propriétés exceptionnelles au Maroc. Achetez, vendez et louez des appartements de luxe, des villas et des espaces commerciaux.' :
                'اكتشف عقارات استثنائية في المغرب. اشترِ، بيع، واستأجر شققًا فاخرة وفيلات ومساحات تجارية.',
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <>
      {/* K Pattern Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='120' font-family='Playfair Display, serif' font-size='140' font-weight='300' fill='%23C6A75E' fill-opacity='0.03'%3EK%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }} />
      </div>

      {/* Wrap everything in CurrencyProvider */}
      <CurrencyProvider>
        <div className="relative z-10" dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
          <ClientOnly>
            <Navbar />
          </ClientOnly>
          <main className="min-h-screen">
            {children}
          </main>
          <WhatsAppButton />
        </div>
      </CurrencyProvider>
    </>
  );
}