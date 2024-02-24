import UserAvatar from "@/components/user-avatar";
import * as React from "react";
import classNames from "classnames";
import { avatar_data } from "@/constants";

type AvatarSelectProps = {
  selected: string
  setSelected: (val: string) => void
}

export default function AvatarSelect({ selected, setSelected }: AvatarSelectProps) {
  const cn = (id: string) => classNames({
    "ring-8 rounded-full": id === selected
  });

  const handleclick = (id: string) => {
    return setSelected(id);
  }
  return (
    <div className="w-full grid grid-cols-3 gap-6">
      {avatar_data.map((item, idx) => (
        <button type="button" className="transition-all hover:scale-[1.09] cursor-pointer"
          onClick={() => handleclick(item.id)} key={idx}>
          <div className={cn(item.id)}>
            <UserAvatar avatar={item.id} size="full" />
          </div>
        </button>
      ))}
    </div>
  )
}

