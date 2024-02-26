import { FcTreeStructure } from "react-icons/fc";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg"
  showLogo?: boolean
  showFooter?: boolean
}

export default function Logo(props: LogoProps) {
  const {
    showLogo = true,
    showFooter = true
  } = props;

  return (
    <Link href={"/"}>
      <div className="flex items-center space-x-1">
        {
          showLogo && <FcTreeStructure size={25} />
        }
        <div className="">
          <p className="font-bold text-2xl p-0 m-0 tracking-tighter">
            CoreTask
          </p>
          {
            showFooter &&
            <p className="text-gray-400 text-xs p-0 m-0 tracking-tight -mt-1">
              Task Manager
            </p>
          }
        </div>
      </div>
    </Link>
  )
}

