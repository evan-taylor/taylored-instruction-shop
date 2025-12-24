import { CartProvider } from 'components/cart/cart-context';
import { IntercomWidget } from 'components/intercom';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
import { getCart } from 'lib/shopify';
import { Readex_Pro } from 'next/font/google';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';

const readexPro = Readex_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-readex-pro'
});

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  description:
    'Shop professional CPR training equipment, AEDs, first aid supplies, and safety gear from Taylored Instruction.',
  keywords: [
    'CPR training equipment',
    'AED',
    'first aid supplies',
    'safety training',
    'CPR manikins',
    'Taylored Instruction'
  ],
  authors: [{ name: 'Taylored Instruction' }],
  creator: 'Taylored Instruction',
  robots: {
    follow: true,
    index: true
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME!
  },
  twitter: {
    card: 'summary_large_image'
  }
};

function NavbarSkeleton() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="h-[52px] w-[180px] animate-pulse rounded bg-neutral-200" />
        <div className="hidden gap-6 md:flex">
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
        </div>
        <div className="h-11 w-11 animate-pulse rounded-md bg-neutral-200" />
      </div>
    </nav>
  );
}

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={readexPro.variable}>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin=""
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
      </head>
      <body className="bg-white text-text">
        <CartProvider cartPromise={cart}>
          <Suspense fallback={<NavbarSkeleton />}>
            <Navbar />
          </Suspense>
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
          <IntercomWidget />
        </CartProvider>
      </body>
    </html>
  );
}
