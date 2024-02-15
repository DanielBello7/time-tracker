import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Text from "@/components/text";
import * as React from "react";
import classNames from "classnames";
import { Textarea } from "@/components/ui/textarea";

type CreateInputProps = {
  label?: string
  sub?: string
  isLoading?: boolean
  change?: (e: string) => void
  value?: string
  containerClass?: string
  inputClass?: string
  type?: "input" | "textarea"
}

export default function FormInput(props: CreateInputProps) {
  const {
    label,
    sub,
    isLoading = false,
    change,
    value,
    containerClass,
    inputClass,
    type = "input"
  } = props;

  const containerClassnames = classNames("space-y-2 my-5", containerClass);
  const onchange = (e: string) => {
    change && change(e);
  }
  return (
    <div className={containerClassnames}>
      <Label>{label}</Label>
      {
        type === "input"
          ?
          <Input
            className={inputClass}
            onChange={(e) => onchange(e.currentTarget.value)}
            disabled={isLoading && true}
            type="text"
            value={value}
          />
          :
          <Textarea
            className={inputClass}
            onChange={(e) => onchange(e.currentTarget.value)}
            disabled={isLoading && true}
            value={value}
          />
      }
      {sub && <Text type="sub">{sub}</Text>}
    </div>
  )
}

