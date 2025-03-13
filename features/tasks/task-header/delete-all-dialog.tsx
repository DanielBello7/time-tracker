import {
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import ensureError from "@/lib/ensure-error";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { resetTasks } from "@/store/tasks-slice";
import { Separator } from "@/components/ui/separator";
import deleteAllTasks from "@/apis/deleta-all-tasks";

export default function DeleteAllTasksDialog() {
  const { _id } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleDeleteAll = () => {
    deleteAllTasks(_id)
      .then(() => {
        dispatch(resetTasks());
        toast("All Task Deleted");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error Occured", { description: err.message });
      });
  }

  return (
    <AlertDialogContent className="w-full md:w-[320px] p-0">
      <AlertDialogHeader className="p-5">
        <AlertDialogTitle className="text-center">Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          This action cannot be undone. This will permanently delete all tasks from your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="border-t space-x-0">
        <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white">
          Cancel
        </AlertDialogCancel>
        <Separator orientation="vertical" />
        <AlertDialogAction className="w-1/2 text-red-600 bg-white border-0 hover:underline hover:bg-white"
          onClick={handleDeleteAll}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

