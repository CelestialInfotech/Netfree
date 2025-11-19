import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const inurl = searchParams.get("in");

  if (!inurl) {
    return NextResponse.json({ error: "Missing in param" }, { status: 400 });
  }

  const apiUrl = `https://net20.cc/pv/hls/${id}.m3u8?in=${inurl}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const data = await response.text(); // m3u8 is TEXT not JSON
    return new NextResponse(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
