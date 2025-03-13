import Back from "@/components/back";
import SelectedTaskHeaderOptions from "./header-options";
import HeaderContainer from "@/components/header-container";

export default function SelectedTaskHeader() {
  return <HeaderContainer left={Back} right={SelectedTaskHeaderOptions} />
}

