import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useImportTask } from "../context"

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
      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}


