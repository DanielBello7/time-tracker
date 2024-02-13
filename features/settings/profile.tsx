import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  return (
    <form className="w-full grid lg:grid-cols-2 gap-4">
      <div className="w-full">
        <Label>Firstname</Label>
        <Input type="text" />
        <p className="text-gray-400 text-xs mt-1">
          Lorem ipsum dolor sit amet
        </p>
      </div>

      <div className="w-full">
        <Label>Lastname</Label>
        <Input type="text" />
        <p className="text-gray-400 text-xs mt-1">
          Lorem ipsum dolor sit amet
        </p>
      </div>

      <div className="w-full">
        <Label>Phone number</Label>
        <Input type="text" />
        <p className="text-gray-400 text-xs mt-1">
          Lorem ipsum dolor sit amet
        </p>
      </div>

      <div className="w-full">
        <Label>Country</Label>
        <Input type="text" />
        <p className="text-gray-400 text-xs mt-1">
          Lorem ipsum dolor sit amet
        </p>
      </div>
    </form>
  )
}

