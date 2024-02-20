import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeIsSelectable, resetSelected } from "@/store/interface-slice";
import { DeleteSelectedDialog } from "./delete-selected-dialog";
import { toast } from "sonner";
import exportTask from "@/lib/export-task";

export default function SelectOptions() {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => state.interface);
  const { tasks } = useAppSelector((state) => state.tasks);

  const cancel = () => {
    dispatch(changeIsSelectable(false));
    dispatch(resetSelected());
  }

  const exportSelected = () => {
    if (selected.length < 1) return
    const exportables = tasks.filter((item) => selected.includes(item._id));
    exportTask(exportables);
    toast("Selected Tasks Exported");
    cancel();
  }

  return (
    <div className="flex items-center space-x-1 border rounded-lg">
      <Button variant={"ghost"} size={"sm"}
        onClick={exportSelected} disabled={selected.length < 1}>
        Export Selected
      </Button>

      <DeleteSelectedDialog />

      <Button variant={"ghost"} size={"sm"} onClick={cancel}>
        Cancel
      </Button>
    </div>
  )
}

