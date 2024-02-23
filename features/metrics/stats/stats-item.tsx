import type { STATS } from "@/types/stats.types";
import { FaDocker } from "react-icons/fa6";

export default function StatsItem(props: STATS) {
  const {
    amount,
    description,
    sub,
    title
  } = props;
  return (
    <div className="w-full border rounded p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs capitalize">
          {title}
        </p>
        <FaDocker />
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

