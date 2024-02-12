import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type Option = {
  id: string
  title: string
}

type FormSelectProps = {
  title?: string
  label?: string
  name: string
  options?: Option[]
  placeholder?: string
  required?: boolean
  isLoading?: boolean
}

export default function FormSelect(props: FormSelectProps) {
  const {
    name,
    required = false,
    options,
    isLoading = false,
    title,
    placeholder,
    label
  } = props;
  return (
    <div className="w-full">
      <Label>{title ?? "Select"}</Label>
      <Select name={name} required={required} disabled={isLoading && true}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label ?? "Options"}</SelectLabel>
            {options && options?.map((item) => (
              <SelectItem value={item.id} key={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

