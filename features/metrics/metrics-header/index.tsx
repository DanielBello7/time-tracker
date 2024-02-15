import MetricsHeaderOptions from "./options";
import HeaderContainer from "@/components/header-container";
import * as React from "react";

export default function MetricsHeader() {
  return <HeaderContainer right={MetricsHeaderOptions} title="Metrics" />
}

