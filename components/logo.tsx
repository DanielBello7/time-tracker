import { assets } from "@/constants";
import Image from "next/image";
import classnames from "classnames";

type LogoProps = {
  size?: "sm" | "md" | "lg"
}

export default function Logo({ size = "sm" }: LogoProps) {
  const cn = classnames("p-0", {
    "w-[90px]": size === "lg",
    "w-[80px]": size === "md",
    "w-[70px]": size === "sm",
  });

  return (
    <Image
      src={assets.logo}
      alt="logo"
      className={cn}
      priority
    />
  )
}

