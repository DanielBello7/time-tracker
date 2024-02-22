import { TASK } from "@/types/task.types";
import axios from "axios";

export default async function findTask(
  id: string
): Promise<TASK> {
  const response = await axios.get(`/api/tasks/${id}`);
  return response.data.payload;
}

