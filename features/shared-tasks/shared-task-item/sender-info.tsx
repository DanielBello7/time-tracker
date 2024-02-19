import type { SHARED_TASK } from "@/types/shared-task.types";
import { Badge } from "@/components/ui/badge";
import UserInfo from "@/components/task-user-info";

type SenderInfoProps = {
  task: SHARED_TASK
}

function SenderInfo({ task }: SenderInfoProps) {
  return (
    <div className="w-full flex items-center justify-between">
      <UserInfo
        email={task.sharedBy.email}
        name={task.sharedBy.name}
        img={task.sharedBy.avatar}
      />
      <Badge className="bg-[#BEF264] text-black">
        {!task.isRead && "New"}
      </Badge>
    </div>
  )
}


export default SenderInfo;
