import HeaderContainer from "@/components/header-container";
import SettingsOptions from "./settings-options";

export default function SettingsHeader() {
  return <HeaderContainer title="Settings" right={SettingsOptions} />
}

