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
import { THREE_DIMENSIONS_CHART_DATA } from "@/types/stats.types";


type ThreeDimensionChartProps = {
  data: THREE_DIMENSIONS_CHART_DATA[]
}

export default function ThreeDimensionChart({ data }: ThreeDimensionChartProps) {
  return (
    <div className='w-full h-[510px] p-3 py-6'>
      <Text className="mb-1 font-bold tracking-tighter" sm>
        Three Dimensions
      </Text>
      <Text className="mb-5 tracking-tighter" sm type="sub">
        Showing the % difference on Bugs, Stories and Total for three weeks
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
          <Bar dataKey="td" fill="#f27c8b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

