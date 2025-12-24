import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === 'full'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      }
    >
      <Link
        className="group/card relative block aspect-square h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:rounded-2xl"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.minVariantPrice.amount,
            currencyCode: item.priceRange.minVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="relative py-8 md:py-12">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

      {/* Section header */}
      <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
            Featured Products
          </h2>
          <p className="mt-2 text-neutral-600">
            Professional-grade training equipment for life-saving skills
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2 md:gap-5 lg:gap-6 lg:max-h-[calc(100vh-280px)]">
          <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
          <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
          <ThreeItemGridItem size="half" item={thirdProduct} />
        </div>
      </div>
    </section>
  );
}
