import { Button } from "@/components/ui/button";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FaEllipsisV } from "react-icons/fa";
import { changeIsSharedSelectable } from "@/store/interface-slice";

export default function SharedTaskHeaderOptions() {
  const { isSharedSelectable } = useAppSelector((state) => state.interface);
  const dispatch = useAppDispatch();
  const click = () => {
    dispatch(changeIsSharedSelectable(isSharedSelectable ? false : true));
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={click}>
            {isSharedSelectable ? "Cancel" : "Select"}
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            Share
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          Delete All
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

