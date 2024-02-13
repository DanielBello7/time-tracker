import HeaderLayout from "@/components/layout/header-layout";
import SettingsOptions from "./settings-options";

export default function SettingsHeader() {
  return <HeaderLayout title="Settings" Right={SettingsOptions} />
}

