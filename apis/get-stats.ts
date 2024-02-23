import type { STATS } from "@/types/stats.types";
import axios from "axios";

export default async function getStats(
  userId: string
): Promise<STATS[]> {
  const response = await axios.get(`/api/users/stats/${userId}`);
  return response.data.payload;
}
