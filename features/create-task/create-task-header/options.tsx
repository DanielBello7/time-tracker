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
import { FaEllipsisV } from "react-icons/fa";
import { useCreateTask } from "../context";
import { LuFilePlus2 } from "react-icons/lu";
import { LuFileX2 } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";

export default function CreateTaskHeaderOptions() {
  const { resetFields } = useCreateTask();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <Button className="p-0 w-full m-0" variant={"ghost"} type="submit" form="create-new-form">
            <DropdownMenuItem className="w-full">
              Save
              <DropdownMenuShortcut>
                <LuFilePlus2 size={17} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Button>
          <DropdownMenuItem onClick={() => resetFields()}>
            Reset Fields
            <DropdownMenuShortcut>
              <LuFileX2 size={17} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          Cancel
          <DropdownMenuShortcut>
            <ImCancelCircle size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

