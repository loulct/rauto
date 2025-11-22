import { list } from '@vercel/blob';

export default async function fetch(directory: string) {
  const res = await list({
    prefix: directory,
  });

  const blobs = res.blobs.map((blob) => ({
    name: blob.pathname,
    url: blob.url,
  }));

  return Response.json(blobs);
}