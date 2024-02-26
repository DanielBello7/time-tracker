import findExternalTask from "@/apis/find-external-task";
import updateExternalTaskStatus from "@/apis/update-external-status";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import ensureError from "@/lib/ensure-error";
import { EXTERNAL_SHARED_TASK } from "@/types/external-shared.types";
import * as React from "react";
import { toast } from "sonner";

type VisibilityStatusProps = {
  taskId: string
}

export default function VisibilityStatus({ taskId }: VisibilityStatusProps) {
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [externalTask, setExternalTask] = React.useState<EXTERNAL_SHARED_TASK | null>(null);

  const getExternalTask = React.useCallback(async () => {
    try {
      const find = await findExternalTask(taskId);
      setExternalTask(find);
      setShow(true);
    } catch { return }
  }, [taskId]);

  const toggleVisibility = async () => {
    if (!externalTask) return
    setIsLoading(true);
    try {
      const response = await updateExternalTaskStatus(taskId, !externalTask.isActive);
      setExternalTask(response);
      toast("Task visibility status has been updated", {
        description: !externalTask.isActive ? "Task has been made visible" : "Task has been protected"
      });
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    } finally {
      return setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getExternalTask();
  }, [getExternalTask]);

  if (!show && !externalTask) return null
  return (
    <DropdownMenuItem onClick={toggleVisibility} disabled={isLoading && true}>
      {externalTask?.isActive ? "Protect" : "Make Visible"}
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

