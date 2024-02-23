import type { TWO_DIMENSIONS_CHART_DATA } from "@/types/stats.types";
// import axios from "axios";

const data: TWO_DIMENSIONS_CHART_DATA[] = [
  {
    name: 'Previous Week',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Last Week',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Current Week',
    uv: 2000,
    pv: 9800,
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
  // const response = await axios.get('/api/tasks/${}/two-dimensions');
  // return response.data.payload;
}


