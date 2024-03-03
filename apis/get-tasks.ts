import type { TASK } from "@/types/task.types";
import type { PaginateResult } from "mongoose"
import axios from "axios";

export async function getTasks(
  userId: string, search?: string | null, type?: string | null
): Promise<PaginateResult<TASK>> {
  let searchUrl = "";
  if (search) {
    searchUrl = `/api/tasks/users/${userId}?search=${search}`;
  } else {
    if (type) searchUrl = `/api/tasks?createdBy=${userId}&type=${type}`;
    else searchUrl = `/api/tasks?createdBy=${userId}`;
  }
  const response = await axios.get(searchUrl);
  return response.data.payload;
}


