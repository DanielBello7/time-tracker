import { Separator } from "@radix-ui/react-select";
import Sidebar from "./sidebar";
import DashboardHeader from "./dashboard-header";
import * as React from "react";
import classNames from "classnames";
import LoadingScreen from "../loading-screen";
import useFetchResources from "./use-fetch-resources";
import DeleteSharedTaskDialog from "@/components/dialogs/delete-shared-task-dialog";
import DeleteTaskDialog from "@/components/dialogs/delete-task-dialog";
import ShareTaskDialog from "@/components/dialogs/share-task-dialog";
import { AnimatePresence, motion } from "framer-motion";

type DashboardLayoutProps = {
    children: React.ReactNode[] | React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { isLoading } = useFetchResources();

    const main = classNames({
        "w-full 2xl:container 2xl:p-0 md:border h-screen overflow-hidden flex": true
    });

    if (isLoading) return <LoadingScreen />
    return (
        <React.Fragment>
            <motion.div className={main}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
            >
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
                        <AnimatePresence mode="wait">
                            {children}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
            <DeleteSharedTaskDialog />
            <DeleteTaskDialog />
            <ShareTaskDialog />
        </React.Fragment>
    )
}

