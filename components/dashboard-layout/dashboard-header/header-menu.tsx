import * as React from "react"
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa6";

import {
  DrawerContent,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import SidebarNav from "../sidebar/sidebar-nav";
import Logo from "@/components/logo";
import { nav_links } from "../sidebar/nav-links";

export default function HeaderMenu() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="md:hidden px-2 m-0 me-2">
          <FaBars />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex justify-center">
              <Logo />
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <DrawerClose id="close-now" className="hidden"></DrawerClose>
            <div className="mt-3 pb-44">
              <SidebarNav items={nav_links} />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

