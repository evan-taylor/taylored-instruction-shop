import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { ProductPrice } from './product-price';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const images = product.images.map((image) => ({
    src: image.url,
    altText: image.altText
  }));

  return (
    <>
      <div className="mb-6 flex flex-col border-b border-neutral-200 pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-primary p-2 text-sm text-white">
          <ProductPrice product={product} />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} images={images} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight text-text-light"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}
