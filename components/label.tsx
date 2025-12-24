import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx(
        'absolute inset-x-0 bottom-0 @container/label',
        'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
        'px-5 pb-5 pt-16',
        {
          'lg:px-8 lg:pb-8 lg:pt-24': position === 'center'
        }
      )}
    >
      <div className="flex items-end justify-between gap-4">
        <h3
          className={clsx(
            'line-clamp-2 font-bold tracking-tight text-white drop-shadow-lg',
            'text-lg leading-tight',
            {
              'lg:text-2xl': position === 'center'
            }
          )}
        >
          {title}
        </h3>
        <Price
          className={clsx(
            'flex-shrink-0 rounded-full px-4 py-2 font-semibold',
            'bg-white text-primary shadow-lg',
            'text-sm',
            {
              'lg:text-base lg:px-5 lg:py-2.5': position === 'center'
            }
          )}
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
