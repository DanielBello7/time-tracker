import ErrorComponent from "@/components/error-component";
import EditTaskHeader from "./edit-task-header";
import CreateTask from "../create-task";
import type { TASK } from "@/types/task.types";

type EditTaskProps = {
  task: TASK | null
  error: null | Error
}

export default function EditTask({ error, task }: EditTaskProps) {
  if (!task) return <ErrorComponent error={error} />
  return (
    <CreateTask
      header={EditTaskHeader}
      type="edit"
      defautValues={{
        body: task.body,
        dateFinished: task.dateFinished as string,
        dateStarted: task.dateStarted as string,
        tags: task.tags,
        timeInterval: task.timeInterval,
        timeSpent: task.timeSpent,
        title: task.title,
        type: task.type
      }}
    />
  )
}

