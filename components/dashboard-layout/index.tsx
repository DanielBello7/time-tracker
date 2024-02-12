import * as React from "react";
import Sidebar from "./sidebar";
import DashboardHeader from "./dashboard-header";
import { Separator } from "@radix-ui/react-select";

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <div className="hidden md:block md:w-3/12 xl:w-2/12"><Sidebar /></div>
      <Separator className="border" />
      <div className="w-full md:w-9/12 xl:w-10/12 flex flex-col">
        <div><DashboardHeader /></div>
        <Separator className="border" />
        <div className="flex grow">{children}</div>
      </div>
    </div>
  )
}

