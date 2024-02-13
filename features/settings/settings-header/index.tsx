import SettingsOptions from "./settings-options";

export default function SettingsHeader() {
  return (
    <div className="w-full py-1 px-3 flex items-center justify-between">
      <h1 className="text-xl">Settings</h1>
      <SettingsOptions />
    </div>
  )
}

