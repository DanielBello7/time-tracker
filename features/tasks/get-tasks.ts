import type { TASK } from "@/types/task.types";
import type { PaginateResult } from "mongoose"
import axios from "axios";

export async function getTasks(userId: string, page?: number): Promise<PaginateResult<TASK>> {
  const response = await axios.get(`/api/tasks/users/${userId}`);
  return response.data.payload;
}


