import updatePassword from "@/apis/update-password";
import passwordAuth from "@/apis/password-auth";
import ensureError from "@/lib/ensure-error";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";

export default function PasswordUpdate() {
  const [newPassword, setNewPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const { _id } = useAppSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = React.useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!oldPassword.trim() || !newPassword.trim()) {
      return toast("Error occured", { description: "Incomplete field values" })
    }
    setIsLoading(true);
    try {
      const check = await passwordAuth(_id, oldPassword);
      if (!check) {
        return toast("Error occured", { description: "Incorrect credentials" });
      }
      await updatePassword(_id, newPassword);
      toast("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="w-full block md:grid grid-cols-2 py-5 gap-3" onSubmit={submit}>
      <div className="w-full">
        <Label>Current Password</Label>
        <Input
          className="w-full"
          disabled={isLoading && true}
          type="password"
          placeholder="*************"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.currentTarget.value)}
          required
        />
        <p className="text-gray-400 text-xs mt-1">
          Enter your current password
        </p>
      </div>

      <div className="w-full">
        <Label>New Password</Label>
        <Input
          className="w-full"
          disabled={isLoading && true}
          type="password"
          value={newPassword}
          placeholder="*************"
          onChange={(e) => setNewPassword(e.currentTarget.value)}
          required
        />
        <p className="text-gray-400 text-xs mt-1">
          Enter your new password
        </p>
      </div>

      <div className="w-full col-span-2 my-3">
        <Button variant={"secondary"} disabled={isLoading && true}
          className="w-3/12">
          Submit
        </Button>
      </div>
    </form>
  );
}

