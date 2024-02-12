import { Separator } from "@/components/ui/separator";
import { nav_links } from "./nav-links";
import Logo from "@/components/logo";
import SidebarNav from "./sidebar-nav";

export default function Sidebar() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-[17px] px-6"><Logo /></div>
      <Separator className="border" />
      <div className="flex flex-col w-full grow p-4">
        <SidebarNav items={nav_links} />
      </div>
    </div>
  )
}

