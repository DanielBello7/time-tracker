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
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/router";
import ExportTaskAction from "./export-task-action";
import ShareAction from "./share-action";
import DeleteAction from "./delete-action";

export default function SelectedTaskHeaderOptions() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <Link href={`/dashboard/tasks/edit/${id}`}>
            <DropdownMenuItem>
              Edit Task
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <ExportTaskAction />
          <DropdownMenuSeparator />
          <ShareAction />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DeleteAction />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

