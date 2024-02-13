import HeaderSearchBar from "@/components/header-search-bar";
import TaskHeaderOptions from "./task-header-options";
import HeaderLayout from "@/components/layout/header-layout";
import * as React from "react";

export default function TasksHeader() {
  return (
    <HeaderLayout
      title="Tasks"
      Right={
        <React.Fragment>
          <HeaderSearchBar />
          <TaskHeaderOptions />
        </React.Fragment>
      }
    />
  )
}

