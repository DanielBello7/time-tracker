import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import {
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialog,
} from "@/components/ui/alert-dialog";

export default function LogoutButton() {
  const logout = () => {
    return signOut({
      redirect: true, callbackUrl: "/sign-in"
    });
  }
  return (
    <div className="absolute top-0 right-0 p-3">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size={"icon"} variant={"ghost"} className="text-red-600">
            <FiLogOut size={25} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full w-[300px] p-0">
          <AlertDialogHeader className="p-5">
            <AlertDialogTitle className="text-center">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You are about to logout, are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t space-x-0">
            <AlertDialogCancel className="w-1/2 border-0 hover:underline hover:bg-white">
              Cancel
            </AlertDialogCancel>
            <Separator orientation="vertical" />
            <Button variant="destructive" onClick={logout}
              className="w-1/2 text-red-600 bg-white border-0 hover:underline hover:bg-white">
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


