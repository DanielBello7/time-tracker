import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";

export default function StatsLoading() {

  return (
    <React.Fragment>
      {[1, 2, 3].map((item) => (
        <Skeleton className="w-full h-[158px]" key={item} />
      ))}
    </React.Fragment>
  )
}

