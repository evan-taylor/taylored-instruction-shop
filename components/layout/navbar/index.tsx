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
    <nav className="sticky top-0 z-50">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-primary" />
      
      {/* Main header */}
      <div className="border-b border-neutral-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 lg:px-8">
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
            {/* Desktop: Show horizontal logo */}
            <div className="hidden md:block">
              <Image
                src="/horizontal-logo-black.png"
                alt="Taylored Instruction Logo"
                width={180}
                height={52}
                className="h-auto max-h-[52px] w-auto"
                priority
              />
            </div>
          </Link>

          {/* Vertical divider */}
          <div className="mx-6 hidden h-8 w-px bg-neutral-200 lg:block" />

          {/* Navigation menu */}
          {menu.length ? (
            <ul className="hidden items-center gap-1 md:flex">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="nav-link relative block px-4 py-2 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="hidden md:block md:w-72 lg:w-80">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          {/* Cart */}
          <div className="ml-4 flex-shrink-0">
            <Suspense fallback={null}>
              <CartModal />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
