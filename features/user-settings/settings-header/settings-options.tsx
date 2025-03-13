import { Button } from "@/components/ui/button";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/router";
import { LuSaveAll } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";

export default function SettingsOptions() {
  const router = useRouter();

  const click = () => {
    router.back();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <Button type="submit" form="profile-form" className="w-full p-0"
          variant={"ghost"}>
          <DropdownMenuItem className="w-full">
            Save
            <DropdownMenuShortcut>
              <LuSaveAll size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Button>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={click}>
          Cancel
          <DropdownMenuShortcut>
            <MdOutlineCancel size={17} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

