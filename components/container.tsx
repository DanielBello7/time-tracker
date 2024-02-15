import { Separator } from "@/components/ui/separator";
import classNames from "classnames";
import * as React from "react";

type DashboardBodyLayoutProps = {
  header?: React.ReactElement | (() => React.ReactElement)
  children?: React.ReactElement[] | React.ReactElement
  grid?: boolean
  className?: string
}

export default function Container({
  header: Header, children, grid = false, className
}: DashboardBodyLayoutProps) {
  const gridclass = classNames({
    "overflow-y-scroll overflow-x-hidden": true,
    "w-full p-3": true,
    "grow": true,
    "grid grid-cols-1 md:grid-cols-2": grid ? true : false,
    "lg:grid-cols-3": grid ? true : false,
    "xl:grid-cols-4 gap-1": grid ? true : false,
    "md:gap-2 lg:gap-2 content-start": grid ? true : false
  }, className);

  return (
    <React.Fragment>
      {
        typeof Header === "function"
          ? <Header />
          : Header
      }
      <Separator className="border-b" />
      <div className={gridclass}>
        {children}
      </div>
    </React.Fragment>
  )
}

