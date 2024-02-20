import deleteSharedTasks from "@/apis/delete-shared-tasks";
import ensureError from "@/lib/ensure-error";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeIsSharedSelectable, resetSharedSelected } from "@/store/interface-slice";
import { toast } from "sonner";
import { removeSharedTasks } from "@/store/tasks-slice";

export default function SelectOptions() {
  const dispatch = useAppDispatch();
  const { sharedSelected } = useAppSelector((state) => state.interface);

  const cancel = () => {
    dispatch(changeIsSharedSelectable(false));
    dispatch(resetSharedSelected());
  }

  const handleDelete = () => {
    deleteSharedTasks(sharedSelected)
      .then(() => {
        dispatch(removeSharedTasks(sharedSelected));
        toast("Selected Shared Tasks Deleted");
        cancel();
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      });
  }

  return (
    <div className="flex items-center space-x-1 border rounded-lg">
      <Button variant={"ghost"} size={"sm"}
        disabled={true}>
        Export Selected
      </Button>

      <Button variant={"ghost"} size={"sm"} disabled={sharedSelected.length < 1}
        onClick={handleDelete}>
        Delete Selected
      </Button>

      <Button variant={"ghost"} size={"sm"} onClick={cancel}>
        Cancel
      </Button>
    </div>
  )
}

