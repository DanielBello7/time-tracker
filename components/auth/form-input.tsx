import { Label } from "../ui/label";
import { Input } from "../ui/input";
import * as React from "react";

type FormInputProps = {
  name: string
  defaultValue?: string
  title: string
  placeholder?: string
  required?: boolean
  isLoading?: boolean
  type?: "text" | "password" | "email"
}

export default function FormInput(props: FormInputProps) {
  const {
    name,
    defaultValue,
    required = false,
    placeholder,
    title,
    type = "text",
    isLoading = false,
  } = props;

  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{title}</Label>
      <Input
        defaultValue={defaultValue}
        type={type}
        required={required}
        name={name}
        disabled={isLoading && true}
        id={name}
        placeholder={placeholder}
      />
    </div>
  )
}

