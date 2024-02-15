import Container from "@/components/layout/container";
import * as React from "react";
import Stats from "./stats";
import MetricsHeader from "./metrics-header";
import Graph from "./graph";

export default function Metrics() {
  return (
    <Container header={MetricsHeader} useGrid={false}>
      <React.Fragment>
        <Stats />
        <Graph />
      </React.Fragment>
    </Container>
  )
}

