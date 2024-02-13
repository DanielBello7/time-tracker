import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UserImg from "@/components/user-img";

export default function AvatarUpdate() {
  return (
    <div className="w-full flex items-center my-4 space-x-4">
      <UserImg size="md" />
      <form className="flex items-center space-x-2">
        <div>
          <Label>Avatar</Label>
          <Input type="file" placeholder="Select image.." />
          <p className="text-gray-400 text-xs mt-1">
            Upload a file
          </p>
        </div>
        <Button className="mt-1 px-5">Submit</Button>
      </form>
    </div>
  )
}

