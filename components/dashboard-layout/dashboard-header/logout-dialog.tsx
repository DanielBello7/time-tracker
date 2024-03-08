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
import { Separator } from "@/components/ui/separator";

export default function LogoutDialog() {
  const click = () => {
    signOut({
      redirect: true, callbackUrl: "/sign-in"
    });
  }
  return (
    <AlertDialogContent className="w-full w-[300px] p-0">
      <AlertDialogHeader className="p-5">
        <AlertDialogTitle className="text-center">
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          You are about to logout, are you sure you want to continue?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="border-t space-x-0 flex-row items-center">
        <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white p-0 m-0">
          Cancel
        </AlertDialogCancel>

        <Separator orientation="vertical" />

        <Button variant="destructive" onClick={click}
          className="w-1/2 text-red-600 bg-white border-0 hover:underline hover:bg-white">
          Logout
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

