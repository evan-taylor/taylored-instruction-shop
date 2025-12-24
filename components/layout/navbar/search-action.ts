'use server';

import { getSearchResults } from 'lib/shopify';

export async function searchProducts(query: string) {
  return getSearchResults(query, 6);
}



