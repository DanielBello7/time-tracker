import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteTaskModal from "./delete-task-dialog";
import { FaEllipsisV, FaAngleRight } from "react-icons/fa";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import exportTask from "@/lib/export-task";


type TaskOptionsProps = {
  _id: string
}

export default function TaskOptions({ _id }: TaskOptionsProps) {
  const { tasks } = useAppSelector((state) => state.tasks);

  const handleExport = () => {
    const item = tasks.find((item) => item._id === _id);
    if (!item) return toast("Error occured", { description: "Unable to find item" });
    exportTask([item]);
    toast("Task Exported");
  }
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 m-0">
            <FaEllipsisV />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44" align="end">
          <DropdownMenuGroup>
            <Link href={`/dashboard/tasks/${_id}`}>
              <DropdownMenuItem>
                View Details
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/tasks/edit/${_id}`}>
              <DropdownMenuItem>
                Edit
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleExport}>
              Export
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Share
              <DropdownMenuShortcut><FaAngleRight /></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-600">
              Delete
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteTaskModal id={_id} />
    </AlertDialog>
  )
}

