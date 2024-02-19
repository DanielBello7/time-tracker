import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { changeIsSharedSelectable } from "@/store/interface-slice";

export default function SelectOptions() {
  const dispatch = useAppDispatch();
  const cancel = () => {
    dispatch(changeIsSharedSelectable(false));
  }
  return (
    <div className="flex items-center space-x-1 border rounded-lg">
      <Button variant={"ghost"} size={"sm"}>Export Selected</Button>
      <Button variant={"ghost"} size={"sm"}>Delete Selected</Button>
      <Button variant={"ghost"} size={"sm"} onClick={cancel}>
        Cancel
      </Button>
    </div>
  )
}

