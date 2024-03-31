import * as React from "react";
import Text from "@/components/text";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TWO_DIMENSIONS_CHART_DATA } from "@/types/stats.types";

type TwoDimensionChartProps = {
  data: TWO_DIMENSIONS_CHART_DATA[]
}

export default function TwoDimensionChart({ data }: TwoDimensionChartProps) {
  return (
    <div className='w-full h-[510px] p-3 py-6'>
      <Text className="mb-1 font-bold tracking-tighter" sm>
        Two Dimensions
      </Text>
      <Text className="mb-5 tracking-tighter" sm type="sub">
        Showing the <span className="text-[#8884d8] font-bold">Bugs</span> insights and <span className="text-[#4891FF] font-bold">Stories</span> insights for the past three weeks
      </Text>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
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
          <Bar dataKey="bd" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sd" fill="#4891FF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


