import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth_links } from "./auth-links";

export default function AuthFooter() {
  return (
    <div className="w-full flex flex-wrap items-center justify-center">
      {auth_links.map((item) => (
        <Button variant={"link"} key={item.id} className="text-gray-500"
          size={"sm"}>
          <Link href={item.href}>
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}

