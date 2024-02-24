import { avatar_data } from "@/constants";
import UserImg from "./user-img";
import Image from "next/image";
import classNames from "classnames";

type UserAvatarProps = {
  avatar?: string | null
  size?: "sm" | "md" | "lg"
}

export default function UserAvatar({ avatar, size }: UserAvatarProps) {
  const selected = avatar_data.find((item) => item.id === avatar);

  const cn = classNames("rounded-full p-0 m-0", {
    "size-10": size === "md",
    "size-8": size === "sm",
    "size-20": size === "lg"
  });

  if (!selected) return <UserImg size={size} />
  return (
    <Image
      className={cn}
      src={selected.item}
      alt="img"
    />
  )
}

