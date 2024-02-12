import { Separator } from "@radix-ui/react-select";
import Sidebar from "./sidebar";
import DashboardHeader from "./dashboard-header";
import * as React from "react";
import classNames from "classnames";

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const main = classNames("w-full 2xl:container 2xl:p-0 2xl:border h-screen overflow-hidden flex");
  const sidebar = classNames("hidden md:block md:w-3/12 xl:w-2/12 h-full");
  const page = classNames("w-full grow flex flex-col md:w-9/12 xl:w-10/12 overflow-hidden");
  return (
    <div className={main}>
      <div className={sidebar}>
        <Sidebar />
      </div>
      <Separator className="hidden md:block border" />
      <div className={page}>
        <div className="w-full"><DashboardHeader /></div>
        <Separator className="border" />
        <div className="flex grow overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

