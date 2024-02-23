import type { SHARED_TASK } from "@/types/shared-task.types";
import { useAppSelector } from "@/store/hooks";
import SenderInfo from "./sender-info";
import TaskBody from "./task-body";
import TaskFooter from "./task-footer";
import classNames from "classnames";

export default function SharedTaskItem(props: SHARED_TASK) {
  const { sharedSelected } = useAppSelector((state) => state.interface);
  const cn = classNames({
    "p-3 px-3 rounded h-[350px] md:h-[360px] lg:h-[430px] xl:h-[420px]": true,
    "w-full border flex flex-col justify-between": true,
    "border-2 border-[#0036C1] bg-[#E1E9FF]": sharedSelected.includes(props._id)
  });

  return (
    <div className={cn}>
      <SenderInfo task={props} />
      <TaskBody task={props} />
      <TaskFooter task={props} />
    </div>
  )
}

