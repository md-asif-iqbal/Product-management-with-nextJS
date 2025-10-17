import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getDb, ObjectId } from "@/lib/mongo";
import { productUpdateSchema } from "@/lib/validation";

// --- Helper: Authentication ---
function auth(req: NextRequest) {
  const a = req.headers.get("authorization") || "";
  const token = a.startsWith("Bearer ") ? a.slice(7) : "";
  return verifyToken(token);
}

// --- GET: Retrieve a product by ID ---
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!auth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  let _id: ObjectId;

  try {
    _id = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const doc = await db.collection("products").findOne({ _id });
  if (!doc) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(doc);
}

// --- PUT: Update a product ---
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!auth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parse = productUpdateSchema.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(
      { message: parse.error.issues[0]?.message || "Invalid payload" },
      { status: 400 }
    );
  }

  const db = await getDb();
  let _id: ObjectId;

  try {
    _id = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const update = { ...parse.data, updatedAt: new Date().toISOString() };
  const result = await db
    .collection("products")
    .findOneAndUpdate({ _id }, { $set: update }, { returnDocument: "after" });

  const updated = result?.value;
  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// --- DELETE: Delete a product ---
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!auth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  let _id: ObjectId;

  try {
    _id = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const res = await db.collection("products").deleteOne({ _id });

  if (res.deletedCount !== 1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
