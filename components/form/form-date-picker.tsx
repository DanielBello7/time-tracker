import { Label } from "@/components/ui/label";
import Text from "@/components/text";
import DatePicker from "../ui/date-picker";
import * as React from "react";
import classNames from "classnames";

type CreateDatePickerProps = {
  title?: string
  sub?: string
  isLoading?: boolean
  className?: string
  change?: (e: string) => void
  value?: string
  required?: boolean
}

export default function FormDatePicker(props: CreateDatePickerProps) {
  const {
    sub,
    value,
    title,
    isLoading = false,
    className,
    change,
    required = false
  } = props;
  const [date, setDate] = React.useState<Date | undefined>(new Date(value ?? ""));
  const cn = classNames("space-y-2 mb-8", className);

  const onchange = (e: React.SetStateAction<Date | undefined>) => {
    setDate(e);
    const textValue = e?.toString() ?? "";
    change && change(textValue);
  }
  return (
    <div className={cn}>
      <Label>{title}</Label>
      <DatePicker
        required={required}
        setDate={onchange}
        isLoading={isLoading}
        date={date}
      />
      {
        sub &&
        <Text type="sub" sm>
          {sub}
        </Text>
      }
    </div>
  )
}

