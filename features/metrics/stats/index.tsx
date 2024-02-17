import StatsItem from "./stats-item";

export default function Stats() {
  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      <StatsItem />
      <StatsItem />
      <StatsItem />
    </div>
  )
}

