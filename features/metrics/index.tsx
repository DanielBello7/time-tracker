import ScreenLayout from "@/components/layout/screen-layout";
import * as React from "react";
import Stats from "./stats";
import MetricsHeader from "./metrics-header";
import Graph from "./graph";

export default function Metrics() {
  return (
    <ScreenLayout Header={MetricsHeader} useGrid={false}>
      <React.Fragment>
        <Stats />
        <Graph />
      </React.Fragment>
    </ScreenLayout>
  )
}

