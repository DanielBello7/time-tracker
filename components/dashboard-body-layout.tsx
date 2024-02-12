import { Separator } from "@/components/ui/separator";
import classNames from "classnames";

type DashboardBodyLayoutProps = {
  header?: React.ReactElement
  children?: React.ReactElement
}

export default function DashboardBodyLayout({
  header, children
}: DashboardBodyLayoutProps) {
  const cn = classNames({
    "overflow-y-scroll overflow-x-hidden": true,
    "w-full grow p-2": true,
    "grid grid-cols-1 md:grid-cols-2": true,
    "lg:grid-cols-3": true,
    "xl:grid-cols-4 gap-1": true,
    "md:gap-2 lg:gap-2 content-start": true
  });

  return (
    <div className="w-full flex flex-col grow overflow-hidden">
      {header}
      <Separator className="border-b" />
      <div className={cn}>{children}</div>
    </div>
  )
}

