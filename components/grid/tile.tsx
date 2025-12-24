import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group relative flex h-full w-full items-center justify-center overflow-hidden',
        'rounded-2xl bg-neutral-100',
        'shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)]',
        'ring-1 ring-black/5',
        {
          'ring-2 ring-primary ring-offset-2': active
        }
      )}
      style={{
        willChange: isInteractive ? 'transform' : undefined
      }}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 via-transparent to-transparent" />

      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition-transform duration-300 ease-[cubic-bezier(.165,.84,.44,1)] group-hover:scale-[1.03]':
              isInteractive
          })}
          {...props}
        />
      ) : null}

      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
