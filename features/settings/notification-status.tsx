import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function NotificationStatus() {
  return (
    <div className="mt-10">
      <div className="flex space-x-2">
        <Checkbox id="terms" className="mt-2" />
        <div>
          <Label className="">
            Send me notification emails
          </Label>
          <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  )
}