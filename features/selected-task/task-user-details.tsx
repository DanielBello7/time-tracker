import SubInfo from "@/components/sub-info";
import UserInfo from "@/components/task-user-info";
import getDate from "@/lib/get-date";
import type { TASK } from "@/types/task.types";

type TaskUserDetailsProps = {
  task: TASK
}

export default function TaskUserDetails({ task }: TaskUserDetailsProps) {
  return (
    <div className="w-full">
      <h1 className="text-2xl">More</h1>
      <p className="mt-2 text-gray-400 text-lg mb-10">
        Information about the author of this task.
        Relevant information for the task itself.
      </p>
      <UserInfo
        email={task.createdBy.email}
        img={task.createdBy.avatar}
        name={task.createdBy.name}
        size="md"
      />
      <div className="my-5 space-y-3">
        <SubInfo msg={getDate(task.dateFinished)} title="task finished at" />
        <SubInfo msg={getDate(task.dateStarted)} title="task started at" />
        <SubInfo msg={`${task.timeSpent} ${task.timeInterval}`} title="timespent" />
      </div>
    </div>
  )
}

