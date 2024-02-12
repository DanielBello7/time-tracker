import Back from "@/components/back";
import SelectedTaskHeaderOptions from "./header-options";

export default function SelectedTaskHeader() {
  return (
    <div className="w-full py-1 px-3 flex items-center justify-between">
      <Back />
      <SelectedTaskHeaderOptions />
    </div>
  )
}

