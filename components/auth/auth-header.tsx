import Link from "next/link";
import classNames from "classnames";
import * as React from "react";

const tabs = [
  {
    title: "Sign In",
    href: "/sign-in",
    id: "sign-in",
  },
  {
    href: "/register",
    title: "Sign Up",
    id: "sign-up",
  }
]

type AuthHeaderProps = {
  current?: "sign-in" | "sign-up"
}
export default function AuthHeader({ current }: AuthHeaderProps) {
  return (
    <div className="w-full flex space-x-1 bg-slate-100 p-1 rounded-lg mb-2">
      {tabs.map((item) => (
        <Link href={item.href} key={item.id} className={
          classNames("w-1/2 p-2 rounded text-center text-sm", {
            "bg-white shadow-sm": current === item.id,
            "text-gray-500": current !== item.id
          })
        }>
          {item.title}
        </Link>
      ))
      }
    </div >
  )
}