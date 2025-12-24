# Taylored Instruction Shop

The official e-commerce store for [Taylored Instruction](https://tayloredinstruction.com) – your source for professional CPR training equipment, AEDs, and safety supplies.

Built with Next.js 16, React 19, and Shopify Storefront API.

## Features

- **Server-Rendered Performance** – React Server Components and streaming for fast page loads
- **Shopify Integration** – Full product catalog, cart, and checkout powered by Shopify
- **Optimized Images** – Next.js Image component with AVIF/WebP support
- **Type-Safe** – Written in TypeScript throughout
- **Modern Styling** – Tailwind CSS v4 with custom brand theming

## Tech Stack

- [Next.js 16](https://nextjs.org/) – React framework with App Router
- [React 19](https://react.dev/) – Latest React with Server Components
- [Tailwind CSS 4](https://tailwindcss.com/) – Utility-first CSS
- [Shopify Storefront API](https://shopify.dev/docs/storefront-api) – Headless commerce
- [Bun](https://bun.sh/) – Fast JavaScript runtime & package manager

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- Shopify store with Storefront API access

### Environment Variables

Create a `.env.local` file with your Shopify credentials:

```bash
COMPANY_NAME="Taylored Instruction"
SHOPIFY_REVALIDATION_SECRET="your-secret"
SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-access-token"
SITE_NAME="Taylored Instruction Shop"
```

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

### Build for Production

```bash
bun run build
bun start
```

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── [page]/          # Dynamic CMS pages
│   ├── product/         # Product detail pages
│   └── search/          # Search and collection pages
├── components/          # React components
│   ├── cart/            # Shopping cart components
│   ├── grid/            # Product grid layouts
│   └── layout/          # Header, footer, navigation
├── lib/                 # Utilities and API clients
│   └── shopify/         # Shopify Storefront API integration
└── public/              # Static assets and images
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#1e5083` | Buttons, links, accents |
| Primary Dark | `#163f69` | Hover states |
| Text | `#1a202c` | Body text |
| Text Light | `#2d3748` | Secondary text |

## Deployment

Deploy to [Vercel](https://vercel.com) for optimal Next.js performance:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Ftaylored-instruction-shop)

## Related

- [Taylored Instruction Main Site](https://tayloredinstruction.com) – Training courses and certifications
- [Contact Us](mailto:info@tayloredinstruction.com) – Questions or support

---

© 2023-2025 Taylored Instruction. All Rights Reserved.
