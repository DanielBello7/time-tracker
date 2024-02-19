import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import deleteTask from "@/apis/delete-task";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import { removeTasks } from "@/store/tasks-slice";

export function DeleteSelectedDialog() {
  const { selected } = useAppSelector((state) => state.interface);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteTask(selected)
      .then(() => {
        dispatch(removeTasks(selected));
        toast("Selected Tasks Deleted");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={selected.length < 1}>
        <Button variant={"ghost"} size={"sm"}>Delete Selected</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[300px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently
            delete the selected items from your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
