import ImportTasksHeaderOptions from "./options";
import HeaderContainer from "@/components/header-container";
import * as React from "react";

export default function ImportTasksHeader() {
  return <HeaderContainer right={ImportTasksHeaderOptions} title="Import Tasks" />
}

