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
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-neutral-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
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
                  className="h-auto max-h-[52px] w-auto dark:brightness-0 dark:invert"
                  priority
                />
              </div>
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:hidden">
                {SITE_NAME}
              </div>
            </Link>
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="text-text-light transition-colors duration-200 hover:text-primary dark:text-neutral-400 dark:hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3">
            <Suspense fallback={null}>
              <CartModal />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
