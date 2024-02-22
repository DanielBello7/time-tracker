import { useCreateTask } from "./context";
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Text from "@/components/text";
import FormRadioItem from "@/components/form/form-radio-item";
import FormInput from "@/components/form/form-input";
import * as React from "react";
import FormDatePicker from "@/components/form/form-date-picker";
import FormSelect from "@/components/form/form-select";

export default function CreateInputFields() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [addTag, setAddTag] = React.useState("");
  const { formData, setFormData } = useCreateTask();

  const handleAddTag = () => {
    if (!addTag.trim()) return
    setFormData({
      ...formData,
      tags: [...formData.tags, addTag]
    });
    setAddTag("");
  }

  const remove = (id: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, idx) => idx !== id)
    });
  }

  const onsubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <form className="w-full md:w-11/12 xl:w-8/12 py-10" onSubmit={onsubmit} id="create-new-form">
      <div>
        <Text type="h1">Task Details</Text>
        <Text type="sub">
          Add details and information
          about the new task you
          are creating here.
        </Text>
      </div>

      <div className="my-9 space-y-2">
        <Text type="sub">Task Type</Text>
        <RadioGroup
          disabled={isLoading && true}
          onValueChange={(e) => setFormData({
            ...formData, type: e as any
          })}
          required={true}
          className="flex space-x-5"
          defaultValue={formData.type}
        >
          <FormRadioItem title="Bug" value="bug" />
          <FormRadioItem title="Story" value="story" />
        </RadioGroup>
      </div>

      <FormInput
        label="Task Title"
        sub="Give your task a title"
        change={(e) => setFormData({
          ...formData,
          title: e
        })}
        placeholder="Title"
        value={formData.title}
        isLoading={isLoading}
        inputType="input"
        required
      />

      <FormInput
        inputType="textarea"
        placeholder="Body"
        label="Task Body"
        sub="Add a description to the task you are creating"
        value={formData.body}
        change={(e) => setFormData({
          ...formData,
          body: e
        })}
        required
        isLoading={isLoading}
      />

      <div className="flex items-end space-x-1">
        <FormInput
          label="Task Tags"
          containerClass="w-full"
          change={(e) => setAddTag(e)}
          value={addTag}
          isLoading={isLoading}
          placeholder="Tags"
        />
        <Button size={"icon"} className="mb-5" type="button" onClick={handleAddTag}
          disabled={isLoading && true} variant={"secondary"}>
          <FaPlus size={10} />
        </Button>
      </div>
      <div className="w-full flex items-center lg:hidden mb-8">
        {formData.tags.map((item, idx) => (
          <Badge key={idx} className="me-2 cursor-pointer"
            onClick={() => remove(idx)}>
            {item}
          </Badge>
        ))}
      </div>

      <FormDatePicker
        title="Date Started"
        sub="Add information about the date the task was started"
        change={(e) => setFormData({
          ...formData,
          dateStarted: e
        })}
        required={true}
        isLoading={isLoading}
        value={formData.dateStarted}
      />

      <FormDatePicker
        title="Date Finished"
        sub="Add information about the date the task was finished"
        change={(e) => setFormData({
          ...formData,
          dateFinished: e
        })}
        required={true}
        isLoading={isLoading}
        value={formData.dateFinished}
      />

      <div>
        <Label>Total Time Spent</Label>
        <div className="flex items-center space-x-1 relative mb-1">
          <Input
            className="w-[60%]"
            type="text"
            placeholder="0"
            value={formData.timeSpent.toString()}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setFormData({
                ...formData,
                timeSpent: value === "" ? parseInt("0") : parseInt(value)
              });
            }}
            pattern="[0-9]*"
            disabled={isLoading && true}
            required
          />
          <FormSelect containerClass="w-[40%]"
            label="Interval"
            isLoading={isLoading}
            onchange={(e) => setFormData({
              ...formData,
              timeInterval: e as any
            })}
            required
            value={formData.timeInterval}
            options={[
              { id: "minutes", title: "Minutes" },
              { id: "hours", title: "Hours" },
              { id: "seconds", title: "Seconds" },
            ]}
          />
        </div>
        <Text type="sub" sm>
          Select the time interval based on how long it took you
        </Text>
      </div>
    </form>
  )
}

