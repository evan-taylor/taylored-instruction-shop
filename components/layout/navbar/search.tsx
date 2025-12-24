'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchResultProduct } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition
} from 'react';
import { searchProducts } from './search-action';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('q') || '');
  const [results, setResults] = useState<SearchResultProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  // Debounced search
  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(-1);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const searchResults = await searchProducts(value);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      });
    }, 150); // 150ms debounce for snappy feel
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && results[selectedIndex]) {
      router.push(`/product/${results[selectedIndex].handle}`);
    } else if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          name="q"
          placeholder="Search for products..."
          autoComplete="off"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="text-md w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 pr-10 text-text placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary md:text-sm"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          {isPending ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-primary" />
          ) : (
            <MagnifyingGlassIcon className="h-4 text-neutral-500" />
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"
          style={{
            animation: 'searchDropdownIn 0.2s cubic-bezier(.215,.61,.355,1)'
          }}
        >
          <ul className="divide-y divide-neutral-100">
            {results.map((product, index) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.handle}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                    setResults([]);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${
                    index === selectedIndex
                      ? 'bg-primary/5'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  {product.featuredImage ? (
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-neutral-100" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-900">
                      {product.title}
                    </p>
                    <p className="text-sm text-primary font-semibold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: product.priceRange.minVariantPrice.currencyCode
                      }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-2">
            <button
              type="button"
              onClick={() => {
                router.push(`/search?q=${encodeURIComponent(query)}`);
                setIsOpen(false);
                setResults([]);
              }}
              className="text-xs text-neutral-600 hover:text-primary transition-colors duration-150"
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-text placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary"
        disabled
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-neutral-500" />
      </div>
    </div>
  );
}
