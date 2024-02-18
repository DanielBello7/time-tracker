import * as React from "react";
import TaskLoading from "./task-loading";

export default function TasksLoader() {
  return (
    <React.Fragment>
      {[1, 2, 3, 4].map((item) => (
        <TaskLoading key={item} />
      ))}
    </React.Fragment>
  )
}
