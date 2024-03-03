import Container from "@/components/container";
import * as React from "react";
import Stats from "./stats";
import MetricsHeader from "./metrics-header";
import Graph from "@/features/metrics/graph";

export default function Metrics() {
    return (
        <Container header={MetricsHeader}>
            <Stats />
            <Graph />
        </Container>
    )
}

