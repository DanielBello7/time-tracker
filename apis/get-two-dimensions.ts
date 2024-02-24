import type { TWO_DIMENSIONS_CHART_DATA } from "@/types/stats.types";
// import axios from "axios";

const data: TWO_DIMENSIONS_CHART_DATA[] = [
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

  return await new Promise((resolve) => {
    setTimeout(() => {
      console.log(userId);
      resolve(data);
    }, 2500);
  })
  // const response = await axios.get('/api/tasks/${userId}/two-dimensions');
  // return response.data.payload;
}


