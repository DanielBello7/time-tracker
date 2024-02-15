import ImportTasksHeaderOptions from "./options";
import HeaderLayout from "@/components/layout/header-layout";
import * as React from "react";

export default function ImportTasksHeader() {
  return <HeaderLayout right={ImportTasksHeaderOptions} title="Import Tasks" />
}

