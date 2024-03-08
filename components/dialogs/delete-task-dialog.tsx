import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialog
} from "@/components/ui/alert-dialog";
import deleteTask from "@/apis/delete-task";
import ensureError from "@/lib/ensure-error";
import { removeTasks } from "@/store/tasks-slice"
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Separator } from "@/components/ui/separator";
import { toggleDeleteTaskDialog } from "@/store/actions-slice"

export default function DeleteTaskDialog() {
  const { showDeleteTaskDialog, deleteTaskList } = useAppSelector((state) => state.actions);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    deleteTask(deleteTaskList)
      .then(() => {
        dispatch(removeTasks(deleteTaskList));
        toast("Task Deleted");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      });
  }
  return (
    <AlertDialog onOpenChange={(e) => dispatch(toggleDeleteTaskDialog(e))} open={showDeleteTaskDialog}>
      <AlertDialogContent className="w-full w-[320px] p-0">
        <AlertDialogHeader className="p-5">
          <AlertDialogTitle className="text-center">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone. This will
            permanently delete the tasks from your
            account and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 border-t space-x-0 flex-row items-center">
          <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white m-0 p-0">
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

