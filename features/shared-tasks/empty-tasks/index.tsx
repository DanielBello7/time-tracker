import Image from "next/image";
import Text from "@/components/text";
import EmptySharedTasksOptions from "./options";
import { assets } from "@/constants";

export default function EmptySharedTasks() {
  return (
    <div className="w-full h-full flex items-center justify-center col-span-6">
      <div className="w-full px-2 md:w-3/12 flex flex-col items-center">
        <Image src={assets.img_b} alt="empty-tasks" />
        <Text type="sub">No shared tasks currently</Text>
        <EmptySharedTasksOptions />
      </div>
    </div>
  )
}

