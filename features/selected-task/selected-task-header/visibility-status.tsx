import findExternalTask from "@/apis/find-external-task";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import { EXTERNAL_SHARED_TASK } from "@/types/external-shared.types";
import * as React from "react";

type VisibilityStatusProps = {
  taskId: string
}

export default function VisibilityStatus({ taskId }: VisibilityStatusProps) {
  const [show, setShow] = React.useState(false);
  const [externalTask, setExternalTask] = React.useState<EXTERNAL_SHARED_TASK | null>(null);

  const getExternalTask = React.useCallback(async () => {
    try {
      const find = await findExternalTask(taskId);
      setExternalTask(find);
      setShow(true);
    } catch { return }
  }, [taskId]);

  const toggleVisibility = () => {

  }

  React.useEffect(() => {
    getExternalTask();
  }, [getExternalTask]);

  if (!show) return null
  return (
    <DropdownMenuItem>
      Disable external view
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

