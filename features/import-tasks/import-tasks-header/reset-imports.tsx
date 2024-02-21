import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useImportTask } from "../context";

export default function ResetImport() {
  const { resetSelected, setImported } = useImportTask();

  const handleClick = () => {
    resetSelected();
    setImported([]);
  }

  return (
    <DropdownMenuItem className="text-red-600" onClick={handleClick}>
      Reset
      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

