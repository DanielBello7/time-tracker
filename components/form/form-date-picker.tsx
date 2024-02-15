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
}

export default function FormDatePicker(props: CreateDatePickerProps) {
  const {
    sub,
    title,
    isLoading = false,
    className,
    change
  } = props;
  const [date, setDate] = React.useState<Date>();
  const cn = classNames("space-y-2 my-5", className);

  const onchange = (e: React.SetStateAction<Date | undefined>) => {
    setDate(e);
    const textValue = e?.toString() ?? "";
    change && change(textValue);
  }
  return (
    <div className={cn}>
      <Label>{title}</Label>
      <DatePicker date={date} setDate={(e) => onchange} isLoading={isLoading} />
      {sub && <Text type="sub">{sub}</Text>}
    </div>
  )
}

