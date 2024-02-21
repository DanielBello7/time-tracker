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
import { Separator } from "@/components/ui/separator";

type DeleteTaskModalProps = {
  id: string
}

export default function ShareTaskDialog({ id }: DeleteTaskModalProps) {
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
    <AlertDialogContent className="w-full md:w-[320px] p-0">
      <AlertDialogHeader className="p-5">
        <AlertDialogTitle className="text-center">
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mt-2 border-t space-x-0">
        <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white">
          Cancel
        </AlertDialogCancel>
        <Separator orientation="vertical" />
        <AlertDialogAction className="w-1/2 text-red-600 bg-white border-0 hover:underline hover:bg-white"
          onClick={handleDelete}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

