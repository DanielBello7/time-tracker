import Features from "./features";
import Hero from "./hero";
import Closure from "./closure";
import GradientBox from "./gradient-box";

export default function Main() {
  return (
    <div className="w-full">
      <GradientBox />
      <Hero />
      <Features />
      <Closure />
      <GradientBox reverse />
    </div>
  )
}

