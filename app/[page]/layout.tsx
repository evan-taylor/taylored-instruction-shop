import Footer from 'components/layout/footer';
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">{children}</div>
      </div>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </>
  );
}
