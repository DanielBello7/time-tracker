"use client";

import { useAppSelector } from "@/store/hooks";
import StatsLoading from "./stats-loading";
import Renderer from "@/components/renderer";
import StatsItem from "./stats-item";
import useStats from "./use-stats";

export default function Stats() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { data, error, isFetching, refetch } = useStats(_id);

  return (
    <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Renderer
        isLoading={isFetching}
        error={error}
        loader={<StatsLoading />}
        refresh={refetch}
      >
        {data &&
          data.map((item: any, idx: number) => (
            <StatsItem {...item} key={idx} />
          ))}
      </Renderer>
    </div>
  );
}
