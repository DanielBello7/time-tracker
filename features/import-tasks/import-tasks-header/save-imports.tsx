import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useImportTask } from "../context";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import uploadImports from "@/apis/upload-imports";
import ensureError from "@/lib/ensure-error";
import { LuSaveAll } from "react-icons/lu";

export default function SaveImports() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { imported, resetSelected, setImported, selected } = useImportTask();

  const onclick = async () => {
    if (imported.length < 1) return
    if (selected.length < 1) {
      toast("Saving Imports");
      uploadImports(_id, imported)
        .then(() => {
          toast("Imports Saved");
          resetSelected();
          setImported([]);
        })
        .catch((error) => {
          const err = ensureError(error);
          toast("Error occured", { description: err.message });
        });
    } else {
      const used = imported.filter((item) => selected.includes(item._id));
      uploadImports(_id, used)
        .then(() => {
          toast("Imports Saved");
          resetSelected();
          setImported([]);
        })
        .catch((error) => {
          const err = ensureError(error);
          toast("Error occured", { description: err.message });
        });
    }
  }

  return (
    <DropdownMenuItem disabled={imported.length < 1 && true} onClick={onclick}>
      Save
      <DropdownMenuShortcut>
        <LuSaveAll size={16} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

