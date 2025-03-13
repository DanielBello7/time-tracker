import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { motion } from "framer-motion";
import { item as val } from "./animate";

export default function StatsLoading() {
  return (
    <React.Fragment>
      {[1, 2, 3].map((item) => (
        <motion.div variants={val} key={item}>
          <Skeleton className="w-full h-[158px]" />
        </motion.div>
      ))}
    </React.Fragment>
  )
}

