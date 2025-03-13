import Features from "./features";
import Hero2 from "./hero-2";
import Hero from "./hero";
import Closure from "./closure";
import GradientBox from "./gradient-box";

export default function Main() {
  return (
    <div className="w-full overflow-hidden">
      <GradientBox />
      {/* <Hero /> */}
      <Hero2 />
      <Features />
      <Closure />
      <GradientBox reverse />
    </div>
  )
}

