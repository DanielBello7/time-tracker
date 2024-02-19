import type { TASK } from "@/types/task.types";
import type { PaginateResult } from "mongoose"
import axios from "axios";

export async function getTasks(
  userId: string, search?: string, type?: string
): Promise<PaginateResult<TASK>> {
  if (search && search.trim().length > 1) {
    const response = await axios.get(`/api/tasks?createdBy=${userId}&search=${search}`);
    return response.data.payload;
  } else {
    if (type) {
      const response = await axios.get(`/api/tasks?createdBy=${userId}&type=${type}`);
      return response.data.payload;
    }
    const response = await axios.get(`/api/tasks?createdBy=${userId}`);
    return response.data.payload;
  }
}


