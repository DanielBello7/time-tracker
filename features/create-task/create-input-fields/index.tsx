import { useCreateTask } from "../create-context";
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group";
import Text from "@/components/text";
import RadioItem from "./radio-item";
import CreateInput from "./create-input";
import * as React from "react";
import CreateDatePicker from "./create-date-picker";
import FormSelect from "@/components/auth/form-select";
import { Input } from "@/components/ui/input";

export default function CreateInputFields() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setTitle, title } = useCreateTask();

  const onsubmit = (event: React.FormEvent) => {
    event.preventDefault();
  }

  return (
    <form className="w-full md:w-11/12 xl:w-8/12 py-10" onSubmit={onsubmit}>
      <div>
        <Text type="h1">Task Details</Text>
        <Text type="sub">
          Lorem ipsum dolor sit amet
          consectetur
          adipisicing elit. Ducimus
          voluptatibus
        </Text>
      </div>

      <div className="my-9 space-y-2">
        <Text type="sub">Task Type</Text>
        <RadioGroup defaultValue="bug" className="flex space-x-5">
          <RadioItem title="Bug" value="bug" />
          <RadioItem title="Story" value="story" />
        </RadioGroup>
      </div>

      <CreateInput label="Task Title"
        sub="Lorem ipsum dolor sit amet consectetur"
      />

      <CreateInput label="Task Body" type="textarea"
        sub="Lorem ipsum dolor sit amet consectetur"
      />

      <CreateInput label="Task Tags"
        sub="Lorem ipsum dolor sit amet consectetur.
        ipsum dolor sit amet consectetur. Dolor sit
        Lorem ipsum dolor sit Lorem ipsum "
      />

      <CreateDatePicker title="Date Started"
        sub="Lorem ipsum dolor sit amet consectetur.
        ipsum dolor sit amet consectetur. dolor sit
        Lorem ipsum dolor sit"
      />

      <CreateDatePicker title="Date Finished"
        sub="Lorem ipsum dolor sit amet consectetur.
        ipsum dolor sit amet consectetur. dolor sit
        Lorem ipsum dolor sit"
      />

      <div>
        <Label>Total Time Spent</Label>
        <div className="flex items-center space-x-1 relative">
          <Input className="w-[60%]" />
          <FormSelect containerClass="w-[40%]"
            label="Interval"
            options={[
              { id: "minutes", title: "Minutes" },
              { id: "hours", title: "Hours" },
              { id: "seconds", title: "Seconds" },
            ]}
          />
        </div>
        <Text type="sub">Lorem ipsum dolor sitamet consectetur</Text>
      </div>
    </form>
  )
}

