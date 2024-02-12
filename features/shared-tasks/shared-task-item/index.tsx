import SenderInfo from "./sender-info";
import TaskBody from "@/components/task-elements/task-body";
import TaskFooter from "@/components/task-elements/task-footer";
import classNames from "classnames";

export default function SharedTaskItem() {
  const cn = classNames({
    "p-2 px-3 rounded h-[370px]": true,
    "w-full border flex flex-col justify-between": true
  });
  return (
    <div className={cn}>
      <SenderInfo />
      <TaskBody />
      <TaskFooter />
    </div>
  )
}

