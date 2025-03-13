import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { FaAngleRight } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { openShareTaskDialog } from "@/store/actions-slice";

export default function ShareAction() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const handlShare = () => {
    if (id && typeof id === "string") {
      dispatch(openShareTaskDialog([id]));
    }
  }

  return (
    <DropdownMenuItem onClick={handlShare}>
      Share
      <DropdownMenuShortcut><FaAngleRight /></DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

