import type { SHARED_TASK } from "@/types/shared-task.types";
import { Badge } from "@/components/ui/badge";
import SharedTaskOptions from "./shared-task-options";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSharedSelected, removeSharedSelected } from "@/store/interface-slice"
import { Checkbox } from "@/components/ui/checkbox";
import upperFirst from "@/lib/upper-first";

type TaskBodyProps = {
  task: SHARED_TASK
}

export default function TaskBody({ task }: TaskBodyProps) {
  const { sharedSelected, isSharedSelectable } = useAppSelector((state) => state.interface);
  const { _id, taskId, } = task;
  const dispatch = useAppDispatch();

  const date = new Date(taskId.createdAt).toLocaleDateString("en-us", {
    dateStyle: "full"
  });

  const handleChange = () => {
    if (sharedSelected.includes(_id)) {
      dispatch(removeSharedSelected([_id]));
    } else {
      dispatch(addSharedSelected([_id]));
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
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
        <h1 className="text-2xl font-bold capitalize">
          {taskId.title.slice(0, 16).trim()}
          {taskId.title.length > 16 && "..."}
        </h1>
        <p className="text-xs text-gray-400">{date}</p>
        <Badge className="capitalize" variant={taskId.type === "bug" ? "default" : "destructive"}>
          {taskId.type}
        </Badge>
        <p className="text-gray-400 md:tracking-tight">
          {upperFirst(taskId.body).slice(0, 156).trim()}
          {taskId.body.length > 156 && "..."}
        </p>
      </div>
    </div>
  )
}

