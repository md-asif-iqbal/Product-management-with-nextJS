// file: app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getDb } from "@/lib/mongo";
import { productCreateSchema } from "@/lib/validation";

function auth(req: NextRequest) {
  const a = req.headers.get("authorization") || "";
  const token = a.startsWith("Bearer ") ? a.slice(7) : "";
  return verifyToken(token);
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 10)));

  const db = await getDb();
  const filter = q ? { name: { $regex: q, $options: "i" } } : {};
  const total = await db.collection("products").countDocuments(filter);
  const items = await db.collection("products")
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return NextResponse.json({ items, total, page, limit });
}

export async function POST(req: NextRequest) {
  const user = auth(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  
  const json = await req.json().catch(() => null);
  const parse = productCreateSchema.safeParse(json);
  if (!parse.success) return NextResponse.json({ message: parse.error.issues[0]?.message || "Invalid payload" }, { status: 400 });

  const doc = {
    ...parse.data,
    createdBy: user.email,
    createdByName: user.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const db = await getDb();
  const result = await db.collection("products").insertOne(doc);
  const created = await db.collection("products").findOne({ _id: result.insertedId });
  return NextResponse.json(created, { status: 201 });
}
