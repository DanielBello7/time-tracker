import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Text from "@/components/text";
import * as React from "react";
import classNames from "classnames";

type CreateInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string
  sub?: string
  isLoading?: boolean
  change?: (e: string) => void
  value?: string
  containerClass?: string
  inputClass?: string
  inputType?: "input" | "textarea"
  required?: boolean
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
    inputType = "input",
    required = false,
    ...rest
  } = props;

  const containerClassnames = classNames("space-y-2 my-5", containerClass);
  const onchange = (e: string) => {
    change && change(e);
  }
  return (
    <div className={containerClassnames}>
      <Label>{label}</Label>
      {
        inputType === "input"
          ?
          <Input
            {...rest}
            required={required}
            ref={undefined}
            className={inputClass}
            onChange={(e) => onchange(e.currentTarget.value)}
            disabled={isLoading && true}
            type="text"
            value={value}
          />
          :
          <Textarea
            required={required}
            className={inputClass}
            onChange={(e) => onchange(e.currentTarget.value)}
            disabled={isLoading && true}
            value={value}
            placeholder="Type something..."
          />
      }
      {sub && <Text type="sub" sm>{sub}</Text>}
    </div>
  )
}

