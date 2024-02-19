import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import deleteTask from "@/apis/delete-task";
import ensureError from "@/lib/ensure-error";
import { removeTasks } from "@/store/tasks-slice"
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";

type DeleteTaskModalProps = {
  id: string
}

export default function DeleteTaskDialog({ id }: DeleteTaskModalProps) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    deleteTask([id])
      .then(() => {
        dispatch(removeTasks([id]));
        toast("Task Deleted");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      });
  }
  return (
    <AlertDialogContent className="w-full md:w-[320px]">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mt-2">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-red-600" onClick={handleDelete}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

