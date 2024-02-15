import MetricsHeaderOptions from "./options";
import HeaderLayout from "@/components/layout/header-layout";
import * as React from "react";

export default function MetricsHeader() {
  return <HeaderLayout right={MetricsHeaderOptions} title="Metrics" />
}

