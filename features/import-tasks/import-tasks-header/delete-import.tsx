import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useImportTask } from "../context";
import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteImport() {
  const { selected, setImported, imported, resetSelected } = useImportTask();

  const onclick = () => {
    const filtered = imported.filter((item) => !selected.includes(item._id));
    setImported(filtered);
    resetSelected();
  }
  return (
    <DropdownMenuItem disabled={selected.length < 1} onClick={onclick}>
      Delete
      <DropdownMenuShortcut>
        <RiDeleteBinLine size={17} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}


