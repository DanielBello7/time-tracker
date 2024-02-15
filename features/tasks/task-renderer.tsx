import * as React from "react";
import TaskItem from "./task-item";
import TaskLoading from "./task-loading";

export default function TaskRenderer() {
  return (
    <React.Fragment>
      {
        !true
          ?
          <>
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </>
          :
          <>
            <TaskLoading />
            <TaskLoading />
            <TaskLoading />
            <TaskLoading />
            <TaskLoading />
            <TaskLoading />
          </>
      }
    </React.Fragment>
  )
}

