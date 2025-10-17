// file: app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";
import { getDb } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const { email, password, name, action } = body || {};
    
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection("users");

    if (action === "register") {
      // Registration
      if (!name) {
        return NextResponse.json({ message: "Name is required for registration" }, { status: 400 });
      }

      // Check if user already exists
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await users.insertOne({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      if (!result.insertedId) {
        return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
      }

      const token = signToken({ email, name, userId: result.insertedId.toString() });
      return NextResponse.json({ token, name, email });
    } else {
      // Login
      const user = await users.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      const token = signToken({ email, name: user.name, userId: user._id.toString() });
      return NextResponse.json({ token, name: user.name, email });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
