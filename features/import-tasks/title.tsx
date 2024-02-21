import type { TASK } from "@/types/task.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { importTaskSchema } from "../../lib/import-task-validator";
import { useImportTask } from "./context";
import Text from "@/components/text";
import readJsonFile from "@/lib/read-json-file";

export default function ImportTaskTitle() {
  const { setImported, imported } = useImportTask();
  const click = () => {
    const element = document.getElementById("select-task-input")!;
    element.click();
  }

  const onchange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.currentTarget.files as FileList;
    const docs = Array.from(files);
    const response = docs.filter((item) => item.type === "application/json");
    const validated = await Promise.all(response.map(async (item) => {
      const data = await readJsonFile(item);
      const { value, error } = importTaskSchema.validate(data);
      if (error) return false;
      return value;
    }));
    const filtered: TASK[] = validated.filter((item) => item !== false);
    const check = imported.map((item) => item._id);
    const newItemsToAdd = filtered.filter((item) => !check.includes(item._id));
    setImported([...imported, ...newItemsToAdd]);
    if (validated.length !== filtered.length) {
      toast("Some uploaded items aren't valid");
    }
  }

  return (
    <div className="w-full md:w-7/12 lg:w-5/12 mt-10">
      <div className="flex items-center justify-between">
        <Text>Select Tasks</Text>
        <Button variant={"secondary"} type="button" onClick={click} size={"sm"}
          className="rounded-full transition-all hover:scale-[1.05]">
          <FaPlus size={10} />
        </Button>
      </div>
      <Text type="sub" className="mt-2 pe-10">
        Select task items you'd like to add to your account,
        you can also import task items exported by other
        users, which would become shared tasks.
      </Text>
      <Input
        className="hidden"
        type="file"
        onChange={onchange}
        accept="application/json"
        multiple
        id="select-task-input"
      />
    </div>
  )
}

