import { list } from '@vercel/blob';

export async function GET(req: Request) {
  try{
    const { searchParams } = new URL(req.url);  
    const prefix = searchParams.get("prefix") || "";
    const res = await list({
      prefix: prefix, token: process.env.BLOB_READ_WRITE_TOKEN
    });

    const blob = res.blobs
    .filter((b) => !b.pathname.endsWith("/"))
    .map((blob) => ({
      name: blob.pathname.split("/").reverse().at(0)?.split(".").at(0),
      url: blob.url,
    })).at(0);

    console.log(blob);

    if (blob !== undefined){
        const text = await fetch(blob.url).then((res) => res.text())
        return Response.json(text)
    }

    // return Response.json(blob);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error){
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
    return new Response(JSON.stringify({error: "Unknown error"}), {status: 500});
  }
}