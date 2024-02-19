import * as React from "react";
import SharedTaskLoading from "./shared-task-loading";

export default function SharedTasksLoader() {
  return (
    <React.Fragment>
      {[1, 2, 3, 4, 5].map((item) => (
        <SharedTaskLoading key={item} />
      ))}
    </React.Fragment>
  )
}

