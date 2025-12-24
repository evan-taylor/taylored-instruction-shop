import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const metadata = {
  description:
    'Shop professional CPR training equipment, AEDs, and safety supplies from Taylored Instruction.',
  openGraph: {
    type: 'website'
  }
};

function GridSkeleton() {
  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) animate-pulse gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <div className="aspect-square rounded-lg bg-neutral-200 md:col-span-4 md:row-span-2" />
      <div className="aspect-square rounded-lg bg-neutral-200 md:col-span-2 md:row-span-1" />
      <div className="aspect-square rounded-lg bg-neutral-200 md:col-span-2 md:row-span-1" />
    </section>
  );
}

function CarouselSkeleton() {
  return (
    <div className="w-full overflow-hidden pb-6 pt-1">
      <div className="flex animate-pulse gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none rounded-lg bg-neutral-200 md:w-1/3"
          />
        ))}
      </div>
    </div>
  );
}

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

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<GridSkeleton />}>
        <ThreeItemGrid />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <Carousel />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </>
  );
}
