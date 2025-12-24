import clsx from 'clsx';
import Image from 'next/image';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center overflow-hidden rounded-lg bg-white',
        {
          'h-[40px] w-[40px]': !size,
          'h-[30px] w-[30px]': size === 'sm'
        }
      )}
    >
      <Image
        src="/Cropped-Circular-Logo.png"
        alt="Taylored Instruction Logo"
        width={size === 'sm' ? 28 : 36}
        height={size === 'sm' ? 28 : 36}
        className="object-contain"
        priority
      />
    </div>
  );
}
