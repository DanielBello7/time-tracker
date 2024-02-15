import { Label } from "../ui/label";
import * as React from "react";
import Text from "../text";
import classNames from "classnames";

import {
  SelectContent,
  SelectGroup,
  Select,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  title: string
  id: string
}

type FormSelectProps = {
  placeholder?: string
  title?: string
  label?: string
  options?: Option[]
  name?: string
  required?: boolean
  isLoading?: boolean
  value?: string
  containerClass?: string
  selectClass?: string
  sub?: string
  onchange?: (val: string) => void
}

export default function FormSelect(props: FormSelectProps) {
  const {
    name,
    required = false,
    options = [],
    isLoading = false,
    title,
    sub,
    placeholder,
    label,
    containerClass,
    selectClass,
    onchange,
    value
  } = props;

  const containerCn = classNames("w-full", containerClass);
  const selectCn = classNames("w-full", selectClass);

  return (
    <div className={containerCn}>
      {
        title &&
        <Label>{title ?? "Select"}</Label>
      }

      <Select name={name} required={required} disabled={isLoading && true}
        onValueChange={(e) => onchange && onchange(e)} value={value}>
        <SelectTrigger className={selectCn}>
          <SelectValue placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label ?? "Options"}</SelectLabel>
            {
              options?.map((item) => (
                <SelectItem value={item.id} key={item.id}>
                  {item.title}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>

      {
        sub &&
        <Text type="sub">{sub}</Text>
      }
    </div>
  )
}

