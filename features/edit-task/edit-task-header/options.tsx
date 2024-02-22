import updateTask from "@/apis/update-task";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateTask } from "@/features/create-task/context";
import { useRouter } from "next/router";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";

export default function EditTaskHeaderOptions() {
  const { formData } = useCreateTask();
  const router = useRouter();
  const { id } = router.query;

  const handleCancel = () => {
    router.back();
  }

  const handleSave = () => {
    if (id && typeof id === "string") {
      updateTask(id, { ...formData })
        .then(() => {
          toast("Task updated");
          router.replace(`/dashboard/tasks/${id}`)
        })
        .catch((error) => {
          const err = ensureError(error);
          toast("Error occured", { description: err.message });
        })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSave}>
            Save
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={handleCancel}>
            Cancel
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

