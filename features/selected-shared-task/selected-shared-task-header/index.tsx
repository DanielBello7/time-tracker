import Back from "@/components/back";
import SelectedSharedTaskHeaderOptions from "./header-options";
import HeaderLayout from "@/components/layout/header-layout";

export default function SelectedTaskHeader() {
  return <HeaderLayout Left={Back} Right={SelectedSharedTaskHeaderOptions} />
}

