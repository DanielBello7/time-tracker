import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import { openDeleteSharedTaskDialog } from "@/store/actions-slice"
import { useRouter } from "next/router";

export default function DeleteAction() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const handleClick = () => {
    if (id && typeof id === "string") {
      dispatch(openDeleteSharedTaskDialog([id]));
    }
  }
  return (
    <DropdownMenuItem onClick={handleClick} className="text-red-600">
      Delete
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

