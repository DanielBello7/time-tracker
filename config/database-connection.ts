import { variables } from "@/constants";
import mongoose from "mongoose";
import UsersModel from "@/models/users.model";
import SharedTasksModel from "@/models/shared-tasks.model";
import TasksModel from "@/models/tasks.model";

type CachedType = {
  conn: typeof mongoose | null
}

let cached: CachedType = {
  conn: null
};

async function databaseConnection(): Promise<void> {
  if (cached.conn) return
  try {
    const response = await mongoose.connect(variables.ENV.MONGO_DB_URL)
    mongoose.connection.once("open", async () => {
      await SharedTasksModel.createIndexes();
      await UsersModel.createIndexes();
      await TasksModel.createIndexes();
    });

    cached.conn = response;
  } catch { return }
}

export default databaseConnection;

