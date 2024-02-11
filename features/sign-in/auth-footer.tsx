import { Button } from "@/components/ui/button";
import Link from "next/link";

const auth_links = [
  {
    title: "Terms and Conditions",
    id: "terms",
    href: "/terms",
  },
  {
    id: "conditions",
    href: "/conditions",
    title: "Conditions"
  },
  {
    id: "forgot-password",
    href: "/forgot-password",
    title: "Forgot Password"
  },
  {
    id: "support",
    href: "/support",
    title: "Support"
  },
  {
    title: "Privacy Report and Conditions",
    id: "privacy",
    href: "/privacy",
  },
]

export default function AuthFooter() {
  return (
    <div className="w-full border flex flex-wrap items-center justify-center">
      {auth_links.map((item) => (
        <Button variant={"link"} key={item.id} className="text-gray-400"
          size={"sm"}>
          <Link href={item.href}>
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}

