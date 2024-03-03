import useTwoDimensions from "./use-two-dimensions";
import Renderer from "@/components/renderer";
import TwoDimensionChart from "./chart";
import TwoDimensionChartLoader from "./loader";
import { useAppSelector } from "@/store/hooks";

export default function TwoDimension() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { data, error, isFetching, refetch } = useTwoDimensions(_id);

  return (
    <Renderer
      isLoading={isFetching}
      error={error}
      loader={<TwoDimensionChartLoader />}
      refresh={refetch}
    >
      {data && <TwoDimensionChart data={data} />}
    </Renderer>
  )
}

