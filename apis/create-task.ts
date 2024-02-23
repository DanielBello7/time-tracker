import type { NEW_TASK, TASK } from "@/types/task.types";
import axios from "axios";

export default async function createTask(
  userId: string,
  data: NEW_TASK[],
): Promise<TASK> {
  const response = await axios.post("/api/tasks", {
    tasks: data,
    userId,
  });
  return response.data.payload;
}
