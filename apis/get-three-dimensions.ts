import type { THREE_DIMENSIONS_CHART_DATA } from "@/types/stats.types";
import axios from "axios";

const _: THREE_DIMENSIONS_CHART_DATA[] = [
  {
    name: 'Previous Week',
    bd: 4000,
    sd: 2400,
    td: 5400,
  },
  {
    name: 'Last Week',
    bd: 3000,
    sd: 1398,
    td: 2400,
  },
  {
    name: 'Current Week',
    bd: 2000,
    sd: 9800,
    td: 7400,
  }
]

export default async function getThreeDimensions(
  userId: string
): Promise<THREE_DIMENSIONS_CHART_DATA[]> {

  return await new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.get(`/api/users/${userId}/three-dimensions`);
      resolve(response.data.payload)
    }, 4000);
  });
}


