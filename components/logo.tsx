import { assets } from "@/constants";
import Image from "next/image";
import classnames from "classnames";

type LogoProps = {
  size?: "sm" | "md" | "lg"
}

export default function Logo({ size = "sm" }: LogoProps) {
  const cn = classnames("border p-0", {
    "w-[100px]": size === "lg",
    "w-[90px]": size === "md",
    "w-[80px]": size === "sm",
  })
  return (
    <Image
      src={assets.logo}
      alt="logo"
      className={cn}
      priority
    />
  )
}

