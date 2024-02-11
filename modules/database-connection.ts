import { variables } from "@/constants";
import mongoose from "mongoose";

async function async_database_connection(): Promise<void> {
  await mongoose.connect(variables.ENV.MONGO_DB_URL);
}

function sync_database_connection(): void {
  new Promise((resolve, reject) => {
    mongoose.connect(variables.ENV.MONGO_DB_URL)
      .then(() => resolve(true))
      .catch((error) => reject(error));
  });
}

export {
  async_database_connection,
  sync_database_connection
};
