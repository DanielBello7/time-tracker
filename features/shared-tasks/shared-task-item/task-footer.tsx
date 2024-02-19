import type { SHARED_TASK } from "@/types/shared-task.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TaskFooterProps = {
  task: SHARED_TASK
}

function TaskFooter({ task }: TaskFooterProps) {
  return (
    <div className="flex justify-end">
      <Link href={`/dashboard/shared-tasks/${task._id}`}>
        <Button variant={"link"} className="underline">
          More
        </Button>
      </Link>
    </div>
  )
}

export default TaskFooter;
