import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import { openDeleteTaskDialog } from "@/store/actions-slice"
import { useRouter } from "next/router";
import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteAction() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const handleDeleteClick = () => {
    if (id && typeof id === "string") {
      dispatch(openDeleteTaskDialog([id]));
    }
  }
  return (
    <DropdownMenuItem className="text-red-600" onClick={handleDeleteClick}>
      Delete Task
      <DropdownMenuShortcut>
        <RiDeleteBinLine size={17} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

