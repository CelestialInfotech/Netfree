import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const series = searchParams.get("series") || "";
  const page = searchParams.get("page") || "";

  const apiUrl = `https://net20.cc/pv/episodes.php?s=${encodeURIComponent(id)}&series=${encodeURIComponent(series)}&page=${encodeURIComponent(page)}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
