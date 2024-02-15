import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type RadioItemProps = {
  title: string
  value: string
}

export default function RadioItem({ title, value }: RadioItemProps) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{title}</Label>
    </div>
  )
}

