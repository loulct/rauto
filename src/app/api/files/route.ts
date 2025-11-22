import { list } from '@vercel/blob';

export async function GET(req: Request) {
  try{
    const { searchParams } = new URL(req.url);  
    const prefix = searchParams.get("prefix") || "";
    const res = await list({
      prefix: prefix, token: process.env.BLOB_READ_WRITE_TOKEN
    });

    const blobs = res.blobs.map((blob) => ({
      name: blob.pathname,
      url: blob.url,
    }));

    return Response.json(blobs);
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}