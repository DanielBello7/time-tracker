import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Text from "@/components/text";

export default function ImportTaskTitle() {
  const click = () => {
    const element = document.getElementById("select-task-input")!;
    element.click();
  }

  return (
    <div className="w-full md:w-1/3 mt-10">
      <div className="flex items-center justify-between">
        <Text>Select Tasks</Text>
        <Button variant={"secondary"} type="button" onClick={click} size={"sm"}
          className="rounded-full transition-all hover:scale-[1.05]">
          <FaPlus />
        </Button>
      </div>
      <Text type="sub" className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Incidunt dolores magnam itaque qui corporis dolore.
      </Text>
      <Input
        type="file"
        className="hidden"
        id="select-task-input"
      />
    </div>
  )
}

