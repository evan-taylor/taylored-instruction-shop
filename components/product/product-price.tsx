'use client';

import Price from 'components/price';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useMemo } from 'react';

export function ProductPrice({ product }: { product: Product }) {
  const { variants, priceRange } = product;
  const { state } = useProduct();

  // Memoize variant selection and price computation to avoid expensive
  // find/every loops on every render for products with many variants
  const price = useMemo(() => {
    // Find the variant that matches the current selection
    const selectedVariant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === state[option.name.toLowerCase()]
      )
    );

    // Fall back to first variant if only one exists, otherwise use the selected one
    const defaultVariant = variants.length === 1 ? variants[0] : undefined;
    const variant = selectedVariant || defaultVariant;

    // Use variant price if available, otherwise fall back to min price range
    return variant?.price || priceRange.minVariantPrice;
  }, [variants, state, priceRange.minVariantPrice]);

  return (
    <Price
      amount={price.amount}
      currencyCode={price.currencyCode}
    />
  );
}

