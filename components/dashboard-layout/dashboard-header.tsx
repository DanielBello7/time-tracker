import UserMenu from "./user-menu";

export default function DashboardHeader() {
  return (
    <div className="w-full py-2 px-3 flex items-center justify-between">
      <h1 className="text-2xl">Dashboard</h1>
      <UserMenu />
    </div>
  )
}

