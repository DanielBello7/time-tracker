import { Button } from "@/components/ui/button";
import { FaEllipsisV } from "react-icons/fa";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { openDeleteSharedTaskDialog } from "@/store/actions-slice"

type SharedTaskOptionsProps = {
  id: string
}

export default function SharedTaskOptions({ id }: SharedTaskOptionsProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    dispatch(openDeleteSharedTaskDialog([id]));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 m-0">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuGroup>
          <Link href={`/dashboard/shared-tasks/${id}`}>
            <DropdownMenuItem>
              View More
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem disabled={true}>
            Export
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleDeleteClick}>
          Delete
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

