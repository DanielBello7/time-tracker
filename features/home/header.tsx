import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const headerOptions = [
    {
      id: 1,
      title: "About",
      href: "/docs",
      variant: "link",
    },
    {
      id: 2,
      title: "Docs",
      variant: "link",
      href: "/docs",
    },
    {
      id: 3,
      title: "Sign In",
      variant: "outline",
      href: "/sign-in",
    },
    {
      id: 4,
      title: "Sign Up Free",
      href: "/register",
      variant: "secondary",
    },
  ]

  return (
    <header className="bg-glass w-full border-b">
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
