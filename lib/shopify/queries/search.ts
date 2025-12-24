export const getPredictiveSearchQuery = /* GraphQL */ `
  query getPredictiveSearch($query: String!, $limit: Int!) {
    predictiveSearch(query: $query, limit: $limit, types: [PRODUCT]) {
      products {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
      }
    }
  }
`;


