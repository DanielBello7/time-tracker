import deleteSharedTasks from "@/apis/delete-shared-tasks";
import {
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialog
} from "@/components/ui/alert-dialog";
import ensureError from "@/lib/ensure-error";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { removeSharedTasks } from "@/store/tasks-slice";
import { Separator } from "@/components/ui/separator";
import { toggleDeleteSharedTaskDialog } from "@/store/actions-slice";

export default function DeleteSharedTaskDialog() {
  const { deleteSharedTaskList, showDeleteSharedTaskDialog } = useAppSelector((state) => state.actions);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteSharedTasks(deleteSharedTaskList)
      .then(() => {
        dispatch(removeSharedTasks(deleteSharedTaskList));
        toast("Shared Task Deleted");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error Occured", { description: err.message });
      });
  }

  return (
    <AlertDialog onOpenChange={(e) => dispatch(toggleDeleteSharedTaskDialog(e))}
      open={showDeleteSharedTaskDialog}>
      <AlertDialogContent className="w-full w-[320px] p-0">
        <AlertDialogHeader className="p-5">
          <AlertDialogTitle className="text-center">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone. This will permanently delete the tasks from your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-t space-x-0 flex-row items-center">
          <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white p-0 m-0">
            Cancel
          </AlertDialogCancel>
          <Separator orientation="vertical" />
          <AlertDialogAction className="w-1/2 text-red-600 bg-white border-0 hover:underline hover:bg-white"
            onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

