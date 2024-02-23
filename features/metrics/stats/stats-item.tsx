import type { STATS } from "@/types/stats.types";
import * as React from "react";
import { ImStatsDots } from "react-icons/im";
import { IoStatsChartSharp, IoStatsChart } from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";
import { BiStats } from "react-icons/bi";

export default function StatsItem(props: STATS) {
  const {
    amount,
    description,
    sub,
    title
  } = props;
  const assets = [
    <ImStatsDots />,
    <IoStatsChartSharp />,
    <IoStatsChart />,
    <ImStatsBars2 />,
    <BiStats />
  ];

  const stats = React.useMemo(() => {
    return assets[Math.floor(Math.random() * 4)]
  }, []);

  return (
    <div className="w-full border rounded p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs capitalize">
          {title}
        </p>
        {stats}
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">
          {amount.toLocaleString()}
        </h1>
        <p className="text-gray-400 text-xs">
          {sub}
        </p>
        <p className="text-xs text-blue-300 tracking-wide">
          {description}
        </p>
      </div>
    </div>
  )
}

