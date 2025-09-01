import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Missing 'name' parameter" }, { status: 400 });
    }

    const response = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`, {
      cache: "no-store", // ensure fresh call
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Upstream error", status: response.status }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: "Proxy failed", details: err.message }, { status: 500 });
  }
}
