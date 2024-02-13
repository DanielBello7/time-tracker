import HeaderSearchBar from "@/components/header-search-bar";
import SharedTaskHeaderOptions from "./shared-tasks-header-options";
import HeaderLayout from "@/components/layout/header-layout";
import * as React from "react";

export default function SharedTasksHeader() {
  return (
    <HeaderLayout
      title="Shared Tasks"
      Right={
        <React.Fragment>
          <HeaderSearchBar />
          <SharedTaskHeaderOptions />
        </React.Fragment>
      }
    />
  )
}

