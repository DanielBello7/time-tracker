import UserImg from "@/components/user-img";
import classNames from "classnames";
import Text from "@/components/text";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { avatar_data } from "@/constants";
import { updateUser } from "@/store/user-slice";
import { toast } from "sonner";
import updateAccount from "@/apis/update-account";
import ensureError from "@/lib/ensure-error";
import UserAvatar from "@/components/user-avatar";
import Image from "next/image";

export default function AvatarUpdate() {
  const { avatar, _id } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const cn = (id: string) => classNames({ "ring-8 rounded-full": id === avatar });

  const handleClick = (id: string) => {
    toast("Avatar Updating...");
    updateAccount(_id, { avatar: id })
      .then(() => {
        dispatch(updateUser({ avatar: id }));
        toast("Avatar Changed");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      });
  }

  return (
    <div className="w-full my-5 mb-10">
      <div className="mb-5">
        <Text className="font-bold">Avatar</Text>
        <Text type="sub">
          Select an avatar for your account
        </Text>
      </div>
      <div className="w-full flex flex-wrap gap-3">
        {avatar_data.map((item, idx) => (
          <button type="button" className="transition-all hover:scale-[1.05] cursor-pointer"
            onClick={() => handleClick(item.id)} key={idx}>
            <div className={cn(item.id)}>
              <UserAvatar avatar={item.id} size="lg" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

