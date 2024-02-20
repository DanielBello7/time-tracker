import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UserImg from "@/components/user-img";
import * as React from "react";

export default function AvatarUpdate() {
  const { avatar } = useAppSelector((state) => state.user.user);
  const [file, setFile] = React.useState<File | null>(null);

  const submit = (event: React.FormEvent) => {

  }
  return (
    <div className="w-full flex items-center my-4 space-x-4">
      <UserImg
        size="md"
        img={file ? URL.createObjectURL(file) : avatar}
      />

      <form className="w-full flex items-center space-x-2" onSubmit={submit}>
        <div className="w-full">
          <Label>Avatar</Label>
          <Input
            type="file"
            placeholder="Select image.."
            className="w-full"
          />
          <p className="text-gray-400 text-xs mt-1">
            Upload a file
          </p>
        </div>
        <Button className="mt-1 px-5">
          Submit
        </Button>
      </form>
    </div>
  )
}

