import type { TASK } from "@/types/task.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import TaskOptions from "./task-options";
import upperFirst from "@/lib/upper-first";

export default function TaskItem(props: TASK) {
  const {
    _id,
    shortCode,
    title,
    createdAt,
    body,
    type
  } = props

  const date = new Date(createdAt).toLocaleDateString("en-us", {
    dateStyle: "full"
  });

  return (
    <div className="w-full border flex flex-col justify-between p-2 px-3 rounded max-h-[380px]">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-[#4891FF] text-xs">#TASK {shortCode}</p>
          <TaskOptions _id={_id} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold capitalize">
            {title.slice(0, 16).trim()}
            {title.length > 16 && "..."}
          </h1>
          <p className="text-xs text-gray-400">{date}</p>
          <Badge className="capitalize" variant={type === "bug" ? "default" : "destructive"}>
            {type}
          </Badge>
          <p className="text-gray-400 md:tracking-tight">
            {upperFirst(body).slice(0, 156).trim()}
            {body.length > 156 && "..."}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link href={`/dashboard/tasks/${_id}`}>
          <Button variant={"link"} className="underline">
            More
          </Button>
        </Link>
      </div>
    </div>
  )
}

