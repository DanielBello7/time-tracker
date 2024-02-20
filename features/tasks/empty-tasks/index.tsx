import Image from "next/image";
import Text from "@/components/text";
import { assets } from "@/constants";
import EmptyTasksOptions from "./options";

export default function EmptyTasks() {
  return (
    <div className="w-full h-full flex items-center justify-center col-span-6">
      <div className="w-full px-2 md:w-3/12 flex flex-col items-center">
        <Image src={assets.img_a} alt="empty-tasks" />
        <Text type="sub">No tasks currently</Text>
        <EmptyTasksOptions />
      </div>
    </div>
  )
}

