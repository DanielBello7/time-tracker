import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import * as React from "react";
import exportTask from "@/lib/export-task";

type ExportActionProps = {
  _id: string
}

export default function ExportAction({ _id }: ExportActionProps) {
  const { tasks } = useAppSelector((state) => state.tasks);

  const handleExport = () => {
    const item = tasks.find((item) => item._id === _id);
    if (!item) return toast("Error occured", { description: "Unable to find item" });
    exportTask([item]);
    toast("Task Exported");
  }

  return (
    <DropdownMenuItem onClick={handleExport}>
      Export
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

