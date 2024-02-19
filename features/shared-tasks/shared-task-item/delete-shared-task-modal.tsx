import deleteSharedTasks from "@/apis/delete-shared-tasks";
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
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { removeSharedTasks } from "@/store/tasks-slice";
import { Separator } from "@/components/ui/separator";

type DeleteSharedTaskDialogProps = {
  id: string
}

export default function DeleteSharedTaskDialog({ id }: DeleteSharedTaskDialogProps) {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    deleteSharedTasks([id])
      .then(() => {
        dispatch(removeSharedTasks([id]));
        toast("Shared Task Deleted");
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
          This action cannot be undone. This will permanently delete this task from your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="border-t space-x-0">
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

