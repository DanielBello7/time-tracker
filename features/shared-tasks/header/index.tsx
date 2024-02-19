import SharedTaskHeaderOptions from "./options";
import HeaderContainer from "@/components/header-container";
import * as React from "react";
import { useAppSelector } from "@/store/hooks";
import SelectOptions from "./select-options";
import SharedTaskHeaderSearchBar from "./header-search";

export default function SharedTasksHeader() {
  const { isSharedSelectable } = useAppSelector((state) => state.interface);
  return (
    <HeaderContainer
      title="Shared Tasks"
      right={
        <React.Fragment>
          {
            isSharedSelectable
              ? <SelectOptions />
              : <SharedTaskHeaderSearchBar />
          }
          <SharedTaskHeaderOptions />
        </React.Fragment>
      }
    />
  )
}

