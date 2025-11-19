import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const realUrl = req.nextUrl.searchParams.get("url");

    if (!realUrl) {
      return new Response("Missing URL", { status: 400 });
    }

    // Required headers for nm-cdn domains
    const upstreamHeaders: any = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://net51.cc/",
      "Origin": "https://net51.cc",
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-dest": "video",
    };

    // Forward Range header (important for .ts segments)
    const range = req.headers.get("range");
    if (range) upstreamHeaders["Range"] = range;

    // Fetch from CDN
    const upstream = await fetch(realUrl, {
      method: "GET",
      headers: upstreamHeaders,
    });

    if (!upstream.ok) {
      return new Response(`CDN error: ${upstream.statusText}`, {
        status: upstream.status,
      });
    }

    const body = upstream.body;

    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ||
          (realUrl.endsWith(".m3u8")
            ? "application/vnd.apple.mpegurl"
            : "video/mp2t"),
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        ...(range ? { "Accept-Ranges": "bytes" } : {}),
      },
    });
  } catch (err: any) {
    return new Response(`Proxy Error: ${err.message}`, { status: 500 });
  }
}
