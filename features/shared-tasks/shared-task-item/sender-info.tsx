import { Badge } from "@/components/ui/badge";
import UserImg from "@/components/user-img";

export default function SenderInfo() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <UserImg />
        <div className="w-full -space-y-1">
          <p className="text-lg">James Doe</p>
          <p className="text-gray-400 text-xs">james@example.com</p>
        </div>
      </div>

      <Badge className="bg-[#BEF264] text-black">New</Badge>
    </div>
  )
}