import { variables } from "@/constants";
import mongoose from "mongoose";

type CachedType = {
  conn: typeof mongoose | null
}

let cached: CachedType = {
  conn: null
};

async function database_connection(): Promise<void> {
  if (cached.conn) return
  try {
    const response = await mongoose.connect(variables.ENV.MONGO_DB_URL)
    cached.conn = response;
  } catch (error) {
    console.log(error);
  }
}

export default database_connection;

