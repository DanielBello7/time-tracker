import type { TASK } from "@/types/task.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSelected, removeSelected } from "@/store/interface-slice";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import TaskOptions from "./task-options";
import upperFirst from "@/lib/upper-first";
import classNames from "classnames";
import * as React from "react";

export default function TaskItem(props: TASK) {
  const { isSelectable, selected } = useAppSelector((state) => state.interface);

  const dispatch = useAppDispatch();
  const {
    _id,
    shortCode,
    title,
    createdAt,
    body,
    type
  } = props;

  const date = new Date(createdAt).toLocaleDateString("en-us", {
    dateStyle: "full"
  });

  const containerCn = classNames("w-full border flex flex-col justify-between p-2 px-3 rounded h-[330px] md:h-[330px] lg:h-[370px] xl:h-[340px]", {
    "border-2 border-[#0036C1] bg-[#E1E9FF]": isSelectable && selected.includes(_id),
  });

  const cn = classNames("flex items-center justify-between", {
    "py-3": isSelectable
  });

  const handleChange = () => {
    if (selected.includes(_id)) {
      dispatch(removeSelected([_id]));
    } else {
      dispatch(addSelected([_id]));
    }
  }

  return (
    <div className={containerCn}>
      <div className="w-full">
        <div className={cn}>
          <p className="text-[#4891FF] text-xs">#TASK {shortCode}</p>
          {
            isSelectable
              ? <Checkbox id={_id} onCheckedChange={handleChange} checked={selected.includes(_id)} />
              : <TaskOptions _id={_id} />
          }
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

