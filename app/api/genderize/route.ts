import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Missing 'name' parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.genderize.io/?name=${encodeURIComponent(name)}`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
