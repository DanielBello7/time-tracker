import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type RadioItemProps = {
  title: string
  value: string
  checked?: boolean
}

export default function FormRadioItem({ title, value, checked }: RadioItemProps) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <RadioGroupItem value={value} id={value} defaultChecked={checked} />
      <Label htmlFor={value}>{title}</Label>
    </div>
  )
}

