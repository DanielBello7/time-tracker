import { SHARED_TASK } from "@/types/shared-task.types";
import SenderInfo from "./sender-info";
import TaskBody from "./task-body";
import TaskFooter from "./task-footer";
import classNames from "classnames";

export default function SharedTaskItem(props: SHARED_TASK) {
  const cn = classNames({
    "p-3 px-3 rounded h-[400px]": true,
    "w-full border flex flex-col justify-between": true
  });
  return (
    <div className={cn}>
      <SenderInfo task={props} />
      <TaskBody task={props} />
      <TaskFooter task={props} />
    </div>
  )
}

