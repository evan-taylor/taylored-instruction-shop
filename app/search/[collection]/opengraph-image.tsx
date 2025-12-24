import OpengraphImage from 'components/opengraph-image';
import { getCollection } from 'lib/shopify';

export default async function Image({
  params
}: {
  params: Promise<{ collection: string }>;
}) {
  const resolvedParams = await params;
  const collection = await getCollection(resolvedParams.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
