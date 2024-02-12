import SharedTaskOptions from "../../features/shared-tasks/shared-task-item/shared-task-options";
import { Badge } from "@/components/ui/badge";

export default function TaskBody() {
  const fakeText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Natus itaque quibusdam hic? Nemo qui fuga labore nesciunt 
  accusamus odit, id libero exercitationem.`;

  const date = new Date().toLocaleDateString("en-us", {
    dateStyle: "full"
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="text-[#4891FF] text-xs">
          #TASK 212345
        </p>
        <SharedTaskOptions />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Bug Removal</h1>
        <p className="text-xs text-gray-400">{date}</p>
        <Badge>Bug</Badge>
        <p className="text-gray-400 md:tracking-tight">
          {fakeText.slice(0, 156)}
          {fakeText.length > 156 && "..."}
        </p>
      </div>
    </div>
  )
}
