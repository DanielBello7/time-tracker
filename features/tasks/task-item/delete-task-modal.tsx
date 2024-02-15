import {
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

export default function DeleteTaskModal() {
  return (
    <AlertDialogContent className="w-full md:w-[320px]">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mt-2">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-red-600">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

