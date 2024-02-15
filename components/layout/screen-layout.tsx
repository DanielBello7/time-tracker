import { Separator } from "@/components/ui/separator";
import classNames from "classnames";
import * as React from "react";

type DashboardBodyLayoutProps = {
  Header?: React.ReactElement | (() => React.ReactElement)
  children?: React.ReactElement
  useGrid?: boolean
  className?: string
}

export default function ScreenLayout({
  Header, children, useGrid = true, className
}: DashboardBodyLayoutProps) {
  const grid = classNames({
    "overflow-y-scroll overflow-x-hidden": true,
    "w-full p-3": true,
    "grow": true,
    "grid grid-cols-1 md:grid-cols-2": useGrid ? true : false,
    "lg:grid-cols-3": useGrid ? true : false,
    "xl:grid-cols-4 gap-1": useGrid ? true : false,
    "md:gap-2 lg:gap-2 content-start": useGrid ? true : false
  }, className);

  return (
    <React.Fragment>
      {
        typeof Header === "function"
          ? <Header />
          : Header
      }
      <Separator className="border-b" />
      <div className={grid}>
        {children}
      </div>
    </React.Fragment>
  )
}

