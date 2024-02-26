import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headerOptions } from "../features/home/header-options";

export default function Header() {
  return (
    <header className="fixed bg-glass w-full border-b">
      <div className="container mx-auto h-full flex items-center justify-between py-2">
        <Logo showFooter={false} />
        <div className="flex items-center space-x-2">
          {headerOptions.map((item) => (
            <Link href={item.href} key={item.id}>
              <Button variant={item.variant as any}>
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
