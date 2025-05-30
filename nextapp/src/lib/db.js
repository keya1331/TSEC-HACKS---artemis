import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      console.log("Connected to MongoDB")
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log("Connected to MongoDB, Cached")
  return cached.conn;
}

export default dbConnect;