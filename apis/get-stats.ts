import type { STATS } from "@/types/stats.types";
import axios from "axios";

export default async function getStats(
  userId: string
): Promise<STATS[]> {
  const response = await axios.get(`/api/users/${userId}/metrics`);
  return response.data.payload;
}
