import Logo from "@/components/logo";
import Text from "@/components/text";
import Link from "next/link";
import { headerOptions } from "@/features/home/header-options";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t">
      <div className="container mx-auto flex items-center justify-between py-10">
        <div>
          <Logo />
          <div className="space-y-1 mt-3 ms-7">
            <Text type="sub" className="mt-3">
              <span>A product by </span>
              <span className="text-gray-600">inScript</span>
            </Text>
            <Text type="sub" className="mt-1">
              <span>See more </span>
              <span className="text-gray-600">@inScript.dev</span>
            </Text>
          </div>
        </div>

        <div className="flex flex-col">
          {headerOptions.map((item) => (
            <Link href={item.href} key={item.id}>
              <Button variant={"link"}>
                {item.footerTitle}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
