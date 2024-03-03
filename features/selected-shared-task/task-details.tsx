import type { SHARED_TASK } from "@/types/shared-task.types";
import { Badge } from "@/components/ui/badge";
import upperFirst from "@/lib/upper-first";

type TaskDetailsProps = {
  task: SHARED_TASK
}

export default function TaskDetails(props: TaskDetailsProps) {
  const { taskId: task } = props.task;
  const date = new Date(task.createdAt).toLocaleDateString("en-us", {
    dateStyle: "full"
  });
  return (
    <div className="w-full pb-20">
      <p className="text-[#4891FF]">#TASK {task.shortCode}</p>
      <h1 className="text-3xl mt-2 capitalize">
        {task.title}
      </h1>
      <p className="text-gray-400 text-xs">
        {date}
      </p>
      <div className="space-x-2 my-3">
        <Badge variant={task.type === "bug" ? "default" : "destructive"} className="capitalize">
          {task.type}
        </Badge>
        {
          task.createdAt !== task.updatedAt
          && <Badge variant={"outline"}>Edited</Badge>
        }
      </div>
      <div className="lg:pe-10">
        <p className="text-lg text-gray-400">
          {upperFirst(task.body).split("\n").map((item, idx) => (
            <p key={idx} className="mb-5">{item}</p>
          ))}
        </p>
      </div>
      <div className="mt-5 lg:pe-10">
        <p className="text-[#4891FF]">TAGS</p>
        <div className="flex items-center flex-wrap my-2">
          {task.tags.map((item, idx) => (
            <Badge key={idx} variant={"secondary"}
              className="mb-2 capitalize me-2">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

