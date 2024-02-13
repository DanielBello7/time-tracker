import UserInfo from "@/components/task/user-info";
import { Badge } from "@/components/ui/badge";

export default function SenderInfo() {
  return (
    <div className="w-full flex items-center justify-between">
      <UserInfo />
      <Badge className="bg-[#BEF264] text-black">
        New
      </Badge>
    </div>
  )
}

