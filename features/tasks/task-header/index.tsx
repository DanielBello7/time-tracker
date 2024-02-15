import HeaderSearchBar from "@/components/header-search-bar";
import TaskHeaderOptions from "./task-header-options";
import HeaderContainer from "@/components/header-container";
import * as React from "react";

export default function TasksHeader() {
  return (
    <HeaderContainer
      title="Tasks"
      right={
        <React.Fragment>
          <HeaderSearchBar />
          <TaskHeaderOptions />
        </React.Fragment>
      }
    />
  )
}

