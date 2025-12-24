import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import ChildrenWrapper from './children-wrapper';
import { Suspense } from 'react';

function FooterSkeleton() {
  return (
    <footer className="border-t border-neutral-200 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid animate-pulse grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="h-32 rounded bg-neutral-200" />
          <div className="h-32 rounded bg-neutral-200" />
          <div className="h-32 rounded bg-neutral-200" />
          <div className="h-32 rounded bg-neutral-200" />
        </div>
      </div>
    </footer>
  );
}

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 pt-6 text-text md:flex-row md:pt-8">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </>
  );
}
