import HeaderSearchBar from "@/components/header-search-bar";
import TaskHeaderOptions from "./task-header-options";
import HeaderContainer from "@/components/header-container";
import * as React from "react";
import { useAppSelector } from "@/store/hooks";
import SelectOptions from "./select-options";

export default function TasksHeader() {
  const { isSelectable } = useAppSelector((state) => state.interface);
  return (
    <HeaderContainer
      title="Tasks"
      right={
        <React.Fragment>
          {isSelectable ? <SelectOptions /> : <HeaderSearchBar />}
          <TaskHeaderOptions />
        </React.Fragment>
      }
    />
  )
}

