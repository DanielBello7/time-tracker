import { Button } from "@/components/ui/button";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import ResetImport from "./reset-imports";
import DeleteImport from "./delete-import";
import SaveImports from "./save-imports";

export default function ImportTasksHeaderOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <FaEllipsisV />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuGroup>
          <SaveImports />
          <DeleteImport />
          <DropdownMenuSeparator />
          <ResetImport />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

