import { Separator } from "@/components/ui/separator";
import TasksHeader from "./task-header";
import classNames from "classnames";
import TaskRenderer from "./task-renderer";

export default function Tasks() {
  const cn = classNames({
    "overflow-y-scroll overflow-x-hidden": true,
    "w-full grow p-2": true,
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3": true,
    "xl:grid-cols-4 gap-1 md:gap-2 lg:gap-2 content-start": true
  });

  return (
    <div className="w-full flex flex-col grow overflow-hidden">
      <TasksHeader />
      <Separator className="border-b" />
      <div className={cn}><TaskRenderer /></div>
    </div>
  )
}

