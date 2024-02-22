import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { changeIsSharedSelectable, resetSharedSelected } from "@/store/interface-slice";
import { openDeleteSharedTaskDialog } from "@/store/actions-slice"

export default function SelectOptions() {
  const dispatch = useAppDispatch();
  const { sharedSelected } = useAppSelector((state) => state.interface);

  const cancel = () => {
    dispatch(changeIsSharedSelectable(false));
    dispatch(resetSharedSelected());
  }

  const handleDeleteClicked = () => {
    dispatch(openDeleteSharedTaskDialog(sharedSelected));
  }

  return (
    <div className="flex items-center space-x-1 border rounded-lg">
      <Button variant={"ghost"} size={"sm"}
        disabled={true}>
        Export Selected
      </Button>

      <Button variant={"ghost"} size={"sm"} disabled={sharedSelected.length < 1}
        onClick={handleDeleteClicked}>
        Delete Selected
      </Button>

      <Button variant={"ghost"} size={"sm"} onClick={cancel}>
        Cancel
      </Button>
    </div>
  )
}

