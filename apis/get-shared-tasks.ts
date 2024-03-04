import type { PaginateResult } from "mongoose";
import type { SHARED_TASK } from "@/types/shared-task.types";
import axios from "axios";
import objectSanitize from "@/lib/object-sanitize";
import parseIntoUrl from "@/lib/parse-into-url";

type SHARED_TASK_FILTER = {
  sharedBy?: string
  sharedTo?: string
  taskId?: string
  isRead?: boolean
  isActive?: boolean
  createdAt?: string
  search?: string
  page?: number
  limit?: number
}

export async function getSharedTasks(
  filter: Partial<SHARED_TASK_FILTER>
): Promise<PaginateResult<SHARED_TASK>> {
  const sanitized = objectSanitize(filter);
  if (sanitized.search) {
    const { search, ...rest } = sanitized;
    const searchUrl = `/api/shared-tasks/search/${search}`;
    const responseText = parseIntoUrl(searchUrl, rest);
    const response = await axios.get(responseText.combined);
    return response.data.payload;
  } else {
    const originalUrl = `/api/shared-tasks`;
    const responseText = parseIntoUrl(originalUrl, sanitized);
    const response = await axios.get(responseText.combined);
    return response.data.payload;
  }
}


