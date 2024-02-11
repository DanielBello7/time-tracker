import { Label } from "../ui/label";
import { Input } from "../ui/input";
import * as React from "react";

type FormInputProps = {
  name: string
  defaultValue?: string
  title: string
  placeholder?: string
  type?: "text" | "password" | "email"
}

export default function FormInput(props: FormInputProps) {
  const {
    name,
    defaultValue,
    placeholder,
    title,
    type = "text"
  } = props;

  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{title}</Label>
      <Input
        defaultValue={defaultValue}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </div>
  )
}

