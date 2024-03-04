import type { TASK } from "@/types/task.types";
import type { PaginateResult } from "mongoose"
import axios from "axios";
import paseIntoUrl from "@/lib/parse-into-url";
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

  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (sanitized.search) {
          const { search, ...rest } = sanitized;
          const searchUrl = `http://localhost:3000/api/tasks/search/${search}`;
          const responseText = paseIntoUrl(searchUrl, rest);
          const response = await axios.get(responseText.combined);
          resolve(response.data.payload);
        } else {
          const originalUrl = "http://localhost:3000/api/tasks";
          const responseText = paseIntoUrl(originalUrl, sanitized);
          const response = await axios.get(responseText.combined);
          resolve(response.data.payload);
        }
      } catch (error) {
        reject(error);
      }
    }, 5000);
  })
  // if (sanitized.search) {
  //   const { search, ...rest } = sanitized;
  //   const searchUrl = `http://localhost:3000/api/tasks/search/${search}`;
  //   const responseText = paseIntoUrl(searchUrl, rest);
  //   const response = await axios.get(responseText.combined);
  //   return response.data.payload;
  // } else {
  //   const originalUrl = "http://localhost:3000/api/tasks";
  //   const responseText = paseIntoUrl(originalUrl, sanitized);
  //   const response = await axios.get(responseText.combined);
  //   return response.data.payload;
  // }
}


