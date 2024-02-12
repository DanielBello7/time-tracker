import SharedTaskItem from "./shared-task-item";
import * as React from "react";

export default function SharedTaskRenderer() {
  return (
    <React.Fragment>
      <SharedTaskItem />
      <SharedTaskItem />
      <SharedTaskItem />
      <SharedTaskItem />
      <SharedTaskItem />
      <SharedTaskItem />
    </React.Fragment>
  )
}

