import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorize(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Server missing ADMIN_PASSWORD" },
      { status: 500 }
    );
  }
  const provided = req.headers.get("x-admin-password");
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function POST(req: NextRequest) {
  const unauthorized = authorize(req);
  if (unauthorized) return unauthorized;

  let body: {
    name?: string;
    category?: string;
    rating?: number | string;
    price?: string;
    link?: string;
    image?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").toString().trim();
  const link = (body.link || "").toString().trim();
  if (!name || !link) {
    return NextResponse.json(
      { error: "name and link are required" },
      { status: 400 }
    );
  }

  const ratingNum = Math.max(
    0,
    Math.min(5, parseFloat(String(body.rating ?? "4.5")) || 4.5)
  );

  const row = {
    name,
    category: (body.category || "Shoes").toString(),
    rating: ratingNum,
    price: (body.price || "").toString(),
    link,
    image: (body.image || "").toString(),
  };

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert(row)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const unauthorized = authorize(req);
  if (unauthorized) return unauthorized;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  const idNum = Number(id);
  if (!Number.isFinite(idNum)) {
    return NextResponse.json({ error: "id must be a number" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", idNum);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
