import ThreeDimensionChartLoader from "./loader";
import useThreeDimensions from "./use-three-dimensions";
import Renderer from "@/components/renderer";
import ThreeDimensionChart from "./chart";
import { useAppSelector } from "@/store/hooks";

export default function ThreeDimension() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { data, error, isFetching, refetch } = useThreeDimensions(_id);

  return (
    <Renderer
      isLoading={isFetching}
      error={error}
      loader={<ThreeDimensionChartLoader />}
      refresh={refetch}
    >
      {data && <ThreeDimensionChart data={data} />}
    </Renderer>
  )
}

