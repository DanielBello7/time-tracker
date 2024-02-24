import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { updateUser } from "@/store/user-slice";
import * as React from "react";
import ensureError from "@/lib/ensure-error";
import updateStatus from "@/apis/update-status";

export default function NotificationStatus() {
  const { user } = useAppSelector((state) => state.user);
  const [status, setStatus] = React.useState<boolean>(user.allowNotifications);
  const dispatch = useAppDispatch();

  const handleChange = (value: boolean) => {
    updateStatus(user._id, { allowNotifications: value })
      .then(() => {
        dispatch(updateUser({ allowNotifications: value }));
        setStatus(value);
        toast("Account Updated");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error Occured", { description: err.message });
      });
  }
  return (
    <div className="mt-5">
      <div className="flex space-x-2">
        <Checkbox
          id="terms"
          className="mt-2"
          onCheckedChange={handleChange}
          checked={status}
        />
        <div>
          <Label className="">
            Send me notification emails
          </Label>
          <p className="text-xs text-gray-400">
            {
              status
                ? "Notification mails would be sent to your email regularly."
                : "Notification mails would not be sent to your email."
            }
          </p>
        </div>
      </div>
    </div>
  )
}

