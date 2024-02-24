import { FcTreeStructure } from "react-icons/fc";
import classnames from "classnames";
import Link from "next/link";

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
    <Link href={"/"}>
      <div className="flex items-center space-x-1">
        <FcTreeStructure size={25} />
        <div className="">
          <p className="font-bold text-2xl p-0 m-0 tracking-tighter">
            CoreTask
          </p>
          <p className="text-gray-400 text-xs p-0 m-0 tracking-tight -mt-1">
            Task Manager
          </p>
        </div>
      </div>
    </Link>
  )
}

