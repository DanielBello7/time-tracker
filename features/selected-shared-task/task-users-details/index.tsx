import type { SHARED_TASK } from "@/types/shared-task.types";
import SubInfo from "@/components/sub-info";
import UserInfo from "@/components/task-user-info";
import getDate from "@/lib/get-date";

type TaskUsersDetailsProps = {
  task: SHARED_TASK
}

export default function TaskUsersDetails({ task }: TaskUsersDetailsProps) {
  const { sharedBy, sharedTo, taskId } = task
  return (
    <div className="w-full">
      <h1 className="text-2xl">More</h1>
      <p className="mt-2 text-gray-400 text-lg mb-10">
        Information about the creator of
        the task and the person the task was shared to,
        also informatin about the duration
        it took to complete the task.
      </p>
      <div className="my-10">
        <h1 className="text-xl text-red-400 pb-3">From</h1>
        <UserInfo size="md" email={sharedBy.email} img={sharedBy.avatar} name={sharedBy.name} />
        <div className="my-5 space-y-3">
          <SubInfo msg={getDate(taskId.dateFinished)} title="task finished at" />
          <SubInfo msg={getDate(taskId.dateStarted)} title="task started at" />
          <SubInfo msg={`${taskId.timeSpent} ${taskId.timeInterval}`} title="timespent" />
          <SubInfo msg={getDate(task.createdAt)} title="task sent at" />
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-xl text-red-400 pb-3">To</h1>
        <UserInfo size="md" email={sharedTo.email} img={sharedTo.avatar} name={sharedTo.name} />
        <div className="my-5 space-y-3 pb-10">
          <SubInfo msg={getDate(task.updatedAt)} title="read at" />
        </div>
      </div>
    </div>
  )
}

