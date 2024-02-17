import { signOut } from "next-auth/react";
import {
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function LogoutDialog() {
  const click = () => {
    signOut({
      redirect: true, callbackUrl: "/sign-in"
    });
  }
  return (
    <AlertDialogContent className="w-[300px]">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You are about to logout, are you sure you want to continue?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button variant="destructive" onClick={click}>Logout</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

