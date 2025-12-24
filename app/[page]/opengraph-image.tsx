import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/shopify';

export default async function Image({ params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params;
  const page = await getPage(resolvedParams.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
