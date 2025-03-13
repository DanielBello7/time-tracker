import type { TWO_DIMENSIONS_CHART_DATA } from "@/types/stats.types";
import axios from "axios";

const _: TWO_DIMENSIONS_CHART_DATA[] = [
  {
    name: 'Previous Week',
    bd: 4000,
    sd: 2400,
  },
  {
    name: 'Last Week',
    bd: 3000,
    sd: 1398,
  },
  {
    name: 'Current Week',
    bd: 2000,
    sd: 9800,
  }
]

export default async function getTwoDimensions(
  userId: string
): Promise<TWO_DIMENSIONS_CHART_DATA[]> {

  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/two-dimensions`);
        resolve(response.data.payload)
      } catch (error) {
        reject(error)
      }
    }, 2500);
  });
}


