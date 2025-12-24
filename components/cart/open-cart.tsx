import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
      <ShoppingCartIcon
        className={clsx('h-5 transition-transform duration-200 ease-out', className)}
      />

      {quantity ? (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white shadow-sm">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
