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
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteAllSharedTasksDialog from "./delete-all-dialog";
import { FaCreativeCommonsShare } from "react-icons/fa";
import { BiSelectMultiple } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function SharedTaskHeaderOptions() {
  const { isSharedSelectable } = useAppSelector((state) => state.interface);
  const dispatch = useAppDispatch();

  const click = () => {
    dispatch(changeIsSharedSelectable(isSharedSelectable ? false : true));
  }

  return (
    <AlertDialog>
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
              <DropdownMenuShortcut>
                {
                  isSharedSelectable
                    ? <GiCancel size={16} />
                    : <BiSelectMultiple size={16} />
                }
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Share
              <DropdownMenuShortcut>
                <FaCreativeCommonsShare size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-600">
              Delete All
              <DropdownMenuShortcut>
                <RiDeleteBin5Line size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAllSharedTasksDialog />
    </AlertDialog>
  )
}

