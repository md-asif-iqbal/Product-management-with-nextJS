import { MongoClient, Db, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "";
if (!uri) console.warn("MONGODB_URI is not set. API routes will fail.");

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb() {
  if (db) return db;

  // Create client if not initialized
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  db = client.db(process.env.MONGODB_DB || "product_mgr");
  return db;
}

export { ObjectId };
