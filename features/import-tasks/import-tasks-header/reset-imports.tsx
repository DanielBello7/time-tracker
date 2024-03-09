import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useImportTask } from "../context";
import { IoMdRefresh } from "react-icons/io";

export default function ResetImport() {
  const { resetSelected, setImported } = useImportTask();

  const handleClick = () => {
    resetSelected();
    setImported([]);
  }

  return (
    <DropdownMenuItem className="text-red-600" onClick={handleClick}>
      Reset
      <DropdownMenuShortcut>
        <IoMdRefresh size={18} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

