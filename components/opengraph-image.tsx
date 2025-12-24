import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFile } from 'fs/promises';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  const file = await readFile(join(process.cwd(), './fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  // Read the logo file
  const logoFile = await readFile(join(process.cwd(), './public/Cropped-Circular-Logo.png'));
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoFile).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1e5083 0%, #163f69 50%, #0f2d4a 100%)'
        }}
      >
        <div tw="flex flex-none items-center justify-center bg-white h-[180px] w-[180px] rounded-3xl shadow-2xl">
          <img src={logoBase64} width="140" height="140" alt="" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white text-center px-12">{title}</p>
        <p tw="mt-4 text-2xl text-white/80">Taylored Instruction Shop</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
