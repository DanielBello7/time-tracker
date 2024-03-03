import type { PaginateResult } from "mongoose";
import type { SHARED_TASK } from "@/types/shared-task.types";
import axios from "axios";

export async function getSharedTasks(
  userId: string, search?: string | null
): Promise<PaginateResult<SHARED_TASK>> {
  return await new Promise((resolve) => {
    setTimeout(async () => {
      let searchUrl = "";
      if (search) searchUrl = `/api/shared-tasks/search?createdBy=${userId}&search=${search}`;
      else searchUrl = `/api/shared-tasks?createdBy=${userId}`;
      const response = await axios.get(searchUrl);
      resolve(response.data.payload);
    }, 5000)
  });
  // let searchUrl = "";
  // if (search) searchUrl = `/api/shared-tasks/search?createdBy=${userId}&search=${search}`;
  // else searchUrl = `/api/shared-tasks?createdBy=${userId}`;
  // const response = await axios.get(searchUrl);
  // return response.data.payload;
}


