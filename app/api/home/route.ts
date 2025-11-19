import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const apiUrl = `https://net20.cc/pv/homepage.php`;

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
