import type { THREE_DIMENSIONS_CHART_DATA } from "@/types/stats.types";
// import axios from "axios";

const data: THREE_DIMENSIONS_CHART_DATA[] = [
  {
    name: 'Previous Week',
    uv: 4000,
    pv: 2400,
    xv: 5400,
  },
  {
    name: 'Last Week',
    uv: 3000,
    pv: 1398,
    xv: 2400,
  },
  {
    name: 'Current Week',
    uv: 2000,
    pv: 9800,
    xv: 7400,
  }
]

export default async function getThreeDimensions(
  userId: string
): Promise<THREE_DIMENSIONS_CHART_DATA[]> {

  return await new Promise((resolve) => {
    setTimeout(() => {
      console.log(userId);
      resolve(data);
    }, 4000);
  })
  // const response = await axios.get('/api/tasks/${}/three-dimensions');
  // return response.data.payload;
}


