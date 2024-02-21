import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialog
} from "@/components/ui/alert-dialog";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toggleShareTaskDialog } from "@/store/actions-slice"

export default function ShareTaskDialog() {
  const dispatch = useAppDispatch();
  const { shareTaskList, showShareTaskDialog } = useAppSelector((state) => state.actions);

  const handleShare = async () => { }

  return (
    <AlertDialog onOpenChange={(e) => dispatch(toggleShareTaskDialog(e))} open={showShareTaskDialog}>
      <AlertDialogContent className="w-full md:w-[320px] p-0">
        <AlertDialogHeader className="p-5">
          <AlertDialogTitle className="text-center">
            Share Task
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="">
          <Input
            type="email"
            placeholder="email@example.com"
            required
          />
        </div>
        <AlertDialogFooter className="mt-2 border-t space-x-0">
          <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white">
            Cancel
          </AlertDialogCancel>
          <Separator orientation="vertical" />
          <AlertDialogAction className="w-1/2 text-red-600 bg-white border-0 hover:underline hover:bg-white"
            onClick={handleShare}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

