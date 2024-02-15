import SharedTaskItem from "./shared-task-item";
import * as React from "react";
import SharedTaskLoading from "./shared-task-loading";

export default function SharedTaskRenderer() {
  return (
    <React.Fragment>
      {
        true
          ?
          <>
            <SharedTaskLoading />
            <SharedTaskLoading />
            <SharedTaskLoading />
            <SharedTaskLoading />
            <SharedTaskLoading />
          </>
          :
          <>
            <SharedTaskItem />
            <SharedTaskItem />
            <SharedTaskItem />
            <SharedTaskItem />
            <SharedTaskItem />
            <SharedTaskItem />
          </>
      }
    </React.Fragment>
  )
}

