import Text from "@/components/text";
import * as React from "react";
import FormSelect from "@/components/form/form-select";
import { role_options } from "@/constants";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type PositionSelectProps = {
  position: string
  setPosition: (val: string) => void
  text: string
  setText: (val: string) => void
}

export default function PositionSelect(props: PositionSelectProps) {
  const {
    position,
    setPosition,
    setText,
    text
  } = props;

  return (
    <div className="w-full md:pt-10">
      <FormSelect
        name="Position"
        options={role_options}
        label="Role"
        title="Role Position"
        value={position}
        onchange={(e) => setPosition(e)}
      />

      {
        position === "other"
        &&
        <React.Fragment>
          <Separator orientation="vertical" className="mx-2 h-16 my-2" />
          <div className="mt-0">
            <Text className="mb-2 text-sm">
              Type in your position
            </Text>
            <Input
              placeholder="Type something..."
              onChange={(e) => setText(e.currentTarget.value)}
              required
              value={text}
              type="text"
            />
          </div>
        </React.Fragment>
      }
    </div>
  )
}

