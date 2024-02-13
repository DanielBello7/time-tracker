import { FaDocker } from "react-icons/fa6";

export default function StatsItem() {
  return (
    <div className="w-full border rounded p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs">Bugs Insight</p>
        <FaDocker />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">41</h1>
        <p className="text-gray-400 text-xs">+20.1% from last week</p>
        <p className="text-xs text-blue-300 tracking-wide">
          This is an insight about the
          total amount of bugs completed
          last week
        </p>
      </div>
    </div>
  )
}

