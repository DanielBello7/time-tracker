import { Separator } from "@radix-ui/react-select";
import Sidebar from "./sidebar";
import DashboardHeader from "./dashboard-header";
import * as React from "react";
import classNames from "classnames";
import LoadingScreen from "../loading-screen";
import useResources from "./use-resources";

type DashboardLayoutProps = {
    children: React.ReactNode[] | React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { isLoading } = useResources();

    const main = classNames({
        "w-full 2xl:container 2xl:p-0 md:border h-screen overflow-hidden flex": true
    });

    if (isLoading) return <LoadingScreen />
    return (
        <div className={main}>
            <div className={"hidden md:block md:w-3/12 xl:w-2/12 h-full"}>
                <Sidebar />
            </div>
            <Separator className="hidden md:block border" />
            <div className={"w-full h-full flex flex-col overflow-hidden md:w-9/12 xl:w-10/12"}>
                <div className="w-full">
                    <DashboardHeader />
                </div>
                <Separator className="border" />
                <div className="flex flex-col grow overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}

