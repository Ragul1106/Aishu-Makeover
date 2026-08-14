import dns from "dns";
import mongoose from "mongoose";

// Force Node.js to use public DNS for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  global._mongooseCache ?? {
    conn: null,
    promise: null,
  };

if (!global._mongooseCache) {
  global._mongooseCache = cached;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((m) => m)
      .catch((error) => {
        cached.promise = null;
        console.error("MongoDB connection failed:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}