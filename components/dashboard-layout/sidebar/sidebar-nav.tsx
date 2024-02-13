"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer"
import Link from "next/link";

type NavItem = {
  id: string;
  title: string;
  href: string,
  icon: React.ReactElement
}

type NavGroup = {
  id: string
  title: string
  links: NavItem[]
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavGroup[]
}

export default function SidebarNav({
  className, items, ...props
}: SidebarNavProps) {
  const pathname = usePathname()
  const cns = cn(
    "flex space-x-2 flex-col space-x-0 space-y-1",
    className
  );

  const click = () => {
    const element = document.getElementById("close-now")!;
    element && element.click();
  }

  return (
    <div className="w-full">
      {items.map((section) => (
        <nav className={cns} {...props} key={section.id}>
          <p className="text-[0.6rem] text-gray-400 mb-1 tracking-tighter ps-2">
            {section.title}
          </p>
          {section.links.map((item) => (
            <Link
              onClick={click}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname == item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start space-x-2"
              )}
              key={item.id}
              href={item.href}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      ))}
    </div>
  )
}
