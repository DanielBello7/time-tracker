import type { SHARED_TASK } from "@/types/shared-task.types";
import { Badge } from "@/components/ui/badge";
import SharedTaskOptions from "./shared-task-options";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSharedSelected, removeSharedSelected } from "@/store/interface-slice"
import { Checkbox } from "@/components/ui/checkbox";
import upperFirst from "@/lib/upper-first";
import classNames from "classnames";
import { useRouter } from "next/router";

type TaskBodyProps = {
  task: SHARED_TASK
}

export default function TaskBody({ task }: TaskBodyProps) {
  const { sharedSelected, isSharedSelectable } = useAppSelector((state) => state.interface);
  const { _id, taskId, } = task;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const date = new Date(taskId.createdAt).toLocaleDateString("en-us", {
    dateStyle: "full"
  });

  const cn = classNames("flex items-center justify-between", {
    "py-3": isSharedSelectable
  })

  const handleChange = () => {
    if (sharedSelected.includes(_id)) {
      dispatch(removeSharedSelected([_id]));
    } else {
      dispatch(addSharedSelected([_id]));
    }
  }

  const handleClick = () => {
    if (!isSharedSelectable) return router.push(`/dashboard/shared-tasks/${task._id}`);
    else handleChange();
  }

  return (
    <div className="w-full">
      <div className={cn}>
        <p className="text-[#4891FF] text-xs">
          #TASK {taskId.shortCode}
        </p>
        {
          isSharedSelectable
            ? <Checkbox id={_id} onCheckedChange={handleChange} checked={sharedSelected.includes(_id)} />
            : <SharedTaskOptions id={_id} />
        }
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold capitalize truncate">
          {taskId.title}
        </h1>
        <p className="text-xs text-gray-400">{date}</p>
        <Badge className="capitalize" variant={taskId.type === "bug" ? "default" : "destructive"}>
          {taskId.type}
        </Badge>
        <p className="text-gray-400 md:tracking-tight line-clamp-4">
          {upperFirst(taskId.body)}
        </p>
      </div>
    </div>
  )
}

