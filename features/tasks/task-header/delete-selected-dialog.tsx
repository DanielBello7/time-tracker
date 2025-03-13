import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { openDeleteTaskDialog } from "@/store/actions-slice";

export function DeleteSelectedDialog() {
  const { selected } = useAppSelector((state) => state.interface);
  const dispatch = useAppDispatch();

  const handleDeleteClicked = () => {
    dispatch(openDeleteTaskDialog(selected));
  }
  return (
    <Button variant={"ghost"} size={"sm"} disabled={selected.length < 1}
      onClick={handleDeleteClicked}>
      Delete Selected
    </Button>
  )
}

