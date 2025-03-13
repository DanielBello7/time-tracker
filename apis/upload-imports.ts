import type { TASK } from "@/types/task.types";
import axios from "axios";

export default async function uploadImports(
  userId: string, data: TASK[]
): Promise<TASK[]> {
  const response = await axios.post("/api/tasks/upload", {
    tasks: data,
    userId
  });
  return response.data.payload;
}

