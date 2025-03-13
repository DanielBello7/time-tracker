import Logo from "@/components/logo";
import Link from "next/link";
import classNames from "classnames";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { headerOptions } from "@/components/header/header-options";

export default function Header() {
  const [show, setShow] = React.useState(false);
  const headerBox = classNames("transition-all md:hidden", {
    "h-0": !show,
    "h-screen bg-white p-10": show
  });

  const handleClick = () => {
    const header = document.getElementById('header')!;
    if (!show) {
      header.classList.remove("bg-glass");
      header.classList.add("bg-white");
    } else {
      header.classList.add("bg-glass");
      header.classList.remove("bg-white");
    }
    return setShow((prev) => !prev);
  }

  React.useEffect(() => {
    let lastScrollTop = 0;
    const header = document.getElementById('header')!;

    const main = () => {
      let currentScroll = document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        if (show) return
        header.classList.remove("bg-white");
        header.classList.add("bg-glass");
        header.classList.add("border-b");
      }
      if (currentScroll === 0) {
        if (show) return
        header.classList.remove("bg-glass");
        header.classList.remove("border-b");
        header.classList.add("bg-white");
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
    window.addEventListener("scroll", main, false);
    return () => {
      window.removeEventListener("scroll", main);
    }
  }, [show]);

  return (
    <header className="fixed bg-white w-full z-50" id="header">
      <div className="container mx-auto h-full flex items-center justify-between py-2">
        <Logo showFooter={false} />
        <div className="hidden md:flex items-center space-x-2">
          {headerOptions.map((item) => (
            <Link href={item.href} key={item.id}>
              <Button variant={item.variant as any} className={item.classNames}>
                {item.title}
              </Button>
            </Link>
          ))}
        </div>

        <Button size={"icon"} variant={"ghost"} className="block md:hidden p-0 m-0"
          onClick={handleClick}>
          <FaBars className="mx-auto" />
        </Button>
      </div>

      <div className={headerBox}>
        {
          show &&
          <motion.div className="items-center space-y-2 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {headerOptions.map((item) => {
              const cn = classNames(item.classNames, "w-full text-center");
              return (
                <Link href={item.href} key={item.id} className="w-full" onClick={handleClick}>
                  <Button variant={"outline"} className={cn}>
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </motion.div>
        }
      </div>
    </header >
  )
}
