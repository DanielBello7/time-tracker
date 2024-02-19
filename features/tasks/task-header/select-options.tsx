import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { changeIsSelectable } from "@/store/interface-slice";
import { DeleteSelectedDialog } from "./delete-selected-dialog";

export default function SelectOptions() {
  const dispatch = useAppDispatch();
  const cancel = () => {
    dispatch(changeIsSelectable(false));
  }
  return (
    <div className="flex items-center space-x-1 border rounded-lg">
      <Button variant={"ghost"} size={"sm"}>Export Selected</Button>
      <DeleteSelectedDialog />
      <Button variant={"ghost"} size={"sm"} onClick={cancel}>
        Cancel
      </Button>
    </div>
  )
}

