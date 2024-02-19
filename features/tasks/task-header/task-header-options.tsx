import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import { changeIsSelectable } from "@/store/interface-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

export default function TaskHeaderOptions() {
  const { isSelectable } = useAppSelector((state) => state.interface)
  const dispatch = useAppDispatch();
  const router = useRouter();

  const select = () => {
    dispatch(changeIsSelectable(isSelectable ? false : true));
  }

  const selectBug = () => {
    router.push(`/dashboard/tasks?type=bug`);
  }

  const selectStory = () => {
    router.push(`/dashboard/tasks?type=story`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Task Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/dashboard/tasks/create"}>
            <DropdownMenuItem>
              New Task
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={select}>
            {isSelectable ? "Cancel Select" : "Select"}
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Delete All
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>Types</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuItem onClick={selectStory}>Stories</DropdownMenuItem>
            <DropdownMenuItem onClick={selectBug}>Bugs</DropdownMenuItem>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

