import { Button } from "@/components/ui/button";
import { FaAngleRight } from "react-icons/fa";
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
import ExportAction from "./export-action";
import { FaEllipsisV } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { openDeleteTaskDialog, openShareTaskDialog } from "@/store/actions-slice"
import { FaRegFile } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuFileEdit } from "react-icons/lu";

type TaskOptionsProps = {
  _id: string
}

export default function TaskOptions({ _id }: TaskOptionsProps) {
  const dispatch = useAppDispatch();

  const handleShareClick = () => {
    dispatch(openShareTaskDialog([_id]));
  }

  const handleDeleteClick = () => {
    dispatch(openDeleteTaskDialog([_id]));
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
          <Link href={`/dashboard/tasks/${_id}`}>
            <DropdownMenuItem>
              View Details
              <DropdownMenuShortcut>
                <FaRegFile size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`/dashboard/tasks/edit/${_id}`}>
            <DropdownMenuItem>
              Edit
              <DropdownMenuShortcut>
                <LuFileEdit size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <ExportAction _id={_id} />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleShareClick}>
            Share
            <DropdownMenuShortcut><FaAngleRight /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleDeleteClick}>
          Delete
          <DropdownMenuShortcut>
            <RiDeleteBinLine size={17} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

