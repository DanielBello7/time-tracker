import HeaderSearchBar from "@/components/header-search-bar";
import SharedTaskHeaderOptions from "./shared-tasks-header-options";
import HeaderContainer from "@/components/header-container";
import * as React from "react";

export default function SharedTasksHeader() {
  return (
    <HeaderContainer
      title="Shared Tasks"
      right={
        <React.Fragment>
          <HeaderSearchBar />
          <SharedTaskHeaderOptions />
        </React.Fragment>
      }
    />
  )
}

