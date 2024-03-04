import type { TASK } from "@/types/task.types";
import type { PaginateResult } from "mongoose"
import axios from "axios";
import parseIntoUrl from "@/lib/parse-into-url";
import objectSanitize from "@/lib/object-sanitize";

type TASK_FETCH_FILTER = {
  type?: string
  timeSpent?: number
  timeInterval?: string
  shortCode?: number
  dateStarted?: string
  createdBy?: string
  createdAt?: string
  dateFinished?: string
  page?: number
  limit?: number
  search?: string
}

export async function getTasks(
  filter: Partial<TASK_FETCH_FILTER>
): Promise<PaginateResult<TASK>> {
  const sanitized = objectSanitize(filter);
  if (sanitized.search) {
    const { search, ...rest } = sanitized;
    const searchUrl = `/api/tasks/search/${search}`;
    const responseText = parseIntoUrl(searchUrl, rest);
    const response = await axios.get(responseText.combined);
    return response.data.payload;
  } else {
    const originalUrl = `/api/tasks`;
    const responseText = parseIntoUrl(originalUrl, sanitized);
    const response = await axios.get(responseText.combined);
    return response.data.payload;
  }
}


