import HeaderMenu from "./header-menu";
import UserMenu from "./user-menu";

export default function DashboardHeader() {
  return (
    <div className="w-full py-2 px-3 flex items-center justify-between">
      <div className="flex items-center">
        <HeaderMenu />
        <h1 className="text-2xl">Dashboard</h1>
      </div>
      <UserMenu />
    </div>
  )
}

