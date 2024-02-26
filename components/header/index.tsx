import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headerOptions } from "@/components/header/header-options";
import * as React from "react";

export default function Header() {
  React.useEffect(() => {
    let lastScrollTop = 0;
    const header = document.getElementById('header')!;

    const main = () => {
      let currentScroll = document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        header.classList.remove("bg-white");
        header.classList.add("bg-glass");
        header.classList.add("border-b");
      }
      if (currentScroll === 0) {
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
  }, []);
  return (
    <header className="fixed bg-white w-full z-50" id="header">
      <div className="container mx-auto h-full flex items-center justify-between py-2">
        <Logo showFooter={false} />
        <div className="flex items-center space-x-2">
          {headerOptions.map((item) => (
            <Link href={item.href} key={item.id}>
              <Button variant={item.variant as any} className={item.classNames}>
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
