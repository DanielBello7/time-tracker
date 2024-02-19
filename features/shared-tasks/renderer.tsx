import type { SHARED_TASK } from "@/types/shared-task.types";
import SharedTaskItem from "./shared-task-item";
import * as React from "react";

type SharedTaskRendererProps = {
  docs: SHARED_TASK[]
}

export default function SharedTaskRenderer({ docs }: SharedTaskRendererProps) {
  return (
    <React.Fragment>
      {docs.map((item) => (
        <SharedTaskItem {...item} key={item._id} />
      ))}
    </React.Fragment>
  )
}

