import * as React from "react";
import Text from "@/components/text";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";


export default function ThreeDimensionChartLoader() {
  const getTempData = () => {
    return Array.from(new Array(3), (_, idx) => {
      return {
        name: ['Previous Week', 'Last Week', 'Current Week'][idx],
        uv: Math.floor(Math.random() * 5000) + 1000,
        pv: Math.floor(Math.random() * 5000) + 1000,
        xv: Math.floor(Math.random() * 5000) + 1000,
      }
    });
  }
  const [tempData, setTempData] = React.useState(getTempData());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTempData(getTempData());
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className='w-full h-[510px] p-3 py-6'>
      <Skeleton className="mb-1 w-2/12 h-4" />
      <Skeleton className="mb-5 w-7/12 h-4" />
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={tempData}>
          <XAxis
            stroke="#888888"
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="uv" fill="rgb(145 145 142)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pv" fill="rgb(231 229 228)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="xv" fill="rgb(204 203 200)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

