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
import { Label } from "@/components/ui/label";
import Text from "@/components/text";
import shareTasks from "@/apis/share-tasks";
import * as React from "react";

export default function ShareTaskDialog() {
  const [text, setText] = React.useState("");
  const { _id } = useAppSelector((state) => state.user.user);
  const { shareTaskList, showShareTaskDialog } = useAppSelector((state) => state.actions);
  const dispatch = useAppDispatch();

  const handleShare = async () => {
    if (!text.trim()) return
    const data = shareTaskList.map((item) => ({ taskId: item, sharedTo: text }))
    shareTasks(_id, data)
      .then(() => {
        toast("Task shared");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      })
  }

  return (
    <AlertDialog onOpenChange={(e) => dispatch(toggleShareTaskDialog(e))} open={showShareTaskDialog}>
      <AlertDialogContent className="w-full md:w-[320px] p-0">
        <AlertDialogHeader className="px-5 pt-3">
          <AlertDialogTitle className="text-center">
            Share Task
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="px-5">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="email@example.com"
            required
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <Text type="sub" sm className="mt-2">
            If the email isn't registered, the user would get it as a link instead
          </Text>
        </div>
        <AlertDialogFooter className="mt-2 border-t space-x-0">
          <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white">
            Cancel
          </AlertDialogCancel>
          <Separator orientation="vertical" />
          <AlertDialogAction className="w-1/2 text-blue-600 bg-white border-0 hover:underline hover:bg-white"
            onClick={handleShare}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

