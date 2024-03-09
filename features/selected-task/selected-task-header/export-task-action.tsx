import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/router";
import * as React from "react";
import exportTask from "@/lib/export-task";
import findTask from "@/apis/find-task";
import ensureError from "@/lib/ensure-error";
import { TiExportOutline } from "react-icons/ti";

export default function ExportTaskAction() {
  const router = useRouter();
  const { id } = router.query;

  const handleExport = async () => {
    if (id && typeof id === "string") {
      toast("Exporting Task");
      try {
        const item = await findTask(id);
        exportTask([item]);
        toast("Task Exported");
      } catch (error) {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      }
    }
  }

  return (
    <DropdownMenuItem onClick={handleExport}>
      Export
      <DropdownMenuShortcut>
        <TiExportOutline size={17} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

