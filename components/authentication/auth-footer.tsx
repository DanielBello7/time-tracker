import { Button } from "@/components/ui/button";
import Link from "next/link";

const auth_links = [
  {
    title: "Terms and Conditions",
    id: "terms",
    href: "/legal#terms",
  },
  {
    id: "about",
    href: "/legal#about",
    title: "About Us"
  },
  {
    id: "forgot-password",
    href: "/forgot-password",
    title: "Forgot Password"
  },
  {
    id: "support",
    href: "/legal#support",
    title: "Support"
  },
  {
    title: "Privacy Policy and Conditions",
    id: "privacy",
    href: "/legal#privacy",
  },
]

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

