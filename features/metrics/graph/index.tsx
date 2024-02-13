import ThreeDimension from "./three-dimension";
import TwoDimension from "./two-dimension";

export default function Graph() {
  return (
    <div className="mt-3 grid lg:grid-cols-3 gap-3">
      <div className="w-full lg:col-span-2 border rounded"><TwoDimension /></div>
      <div className="w-full border rounded"><ThreeDimension /></div>
    </div>
  )
}
