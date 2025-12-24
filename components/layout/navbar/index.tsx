import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import type { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        {/* Mobile menu button */}
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo */}
        <Link
          href="/"
          prefetch={true}
          className="flex flex-shrink-0 items-center"
        >
          {/* Mobile: Show square logo */}
          <div className="md:hidden">
            <LogoSquare />
          </div>
          {/* Desktop: Show horizontal logo - now bigger */}
          <div className="hidden md:block">
            <Image
              src="/horizontal-logo-black.png"
              alt="Taylored Instruction Logo"
              width={220}
              height={64}
              className="h-auto max-h-[64px] w-auto"
              priority
            />
          </div>
        </Link>

        {/* Navigation menu */}
        {menu.length ? (
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  prefetch={true}
                  className="whitespace-nowrap text-neutral-600 transition-colors duration-200 hover:text-primary"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Spacer to push search and cart to the right */}
        <div className="flex-1" />

        {/* Search - now on the right */}
        <div className="hidden md:block md:w-80 lg:w-96">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        {/* Cart */}
        <div className="flex-shrink-0">
          <Suspense fallback={null}>
            <CartModal />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
