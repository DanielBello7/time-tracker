"use client";

import { useAppSelector } from "@/store/hooks";
import StatsLoading from "./stats-loading";
import Renderer from "@/components/renderer";
import StatsItem from "./stats-item";
import useStats from "./use-stats";
import { motion } from "framer-motion";
import { container, item as val } from "./animate";

export default function Stats() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { data, error, isFetching, refetch } = useStats(_id);

  return (
    <motion.div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" animate="show" exit="hidden">
      <Renderer
        isLoading={isFetching}
        error={error}
        loader={<StatsLoading />}
        refresh={refetch}
      >
        {data &&
          data.map((item: any, idx: number) => (
            <motion.div key={idx} variants={val}>
              <StatsItem {...item} />
            </motion.div>
          ))}
      </Renderer>
    </motion.div>
  );
}
