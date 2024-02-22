import axios from "axios";
import type { UPDATE_TASK } from "@/types/task.types";

export default async function updateTask(
  taskId: string, data: UPDATE_TASK
): Promise<void> {
  const response = await axios.patch(`/api/tasks/${taskId}`, {
    ...data
  });
  return response.data.payload
}

