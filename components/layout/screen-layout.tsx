import { Separator } from "@/components/ui/separator";
import classNames from "classnames";

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
    "w-full grow p-2": true,
    "grid grid-cols-1 md:grid-cols-2": true,
    "lg:grid-cols-3": true,
    "xl:grid-cols-4 gap-1": true,
    "md:gap-2 lg:gap-2 content-start": true
  }, className);

  const nogrid = classNames({
    "overflow-y-scroll overflow-x-hidden": true,
    "w-full grow p-2": true
  }, className);

  return (
    <div className="w-full flex flex-col grow overflow-hidden">
      {typeof Header === "function" ? <Header /> : Header}
      <Separator className="border-b" />
      {
        useGrid
          ? <div className={grid}>{children}</div>
          : <div className={nogrid}>{children}</div>
      }
    </div>
  )
}

