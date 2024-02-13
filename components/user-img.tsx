"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assets } from "@/constants";
import ensureError from "@/lib/ensure-error";
import Spinner from "./spinner";
import Image from "next/image";
import axios from "axios";
import classNames from "classnames";
import * as React from "react";

type UserImgProps = {
  img?: string | null
  fallbackText?: string
  size?: "sm" | "md" | "lg"
}

export default React.memo(function UserImg({ img, fallbackText, size = "sm" }: UserImgProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [downloaded, setDownloaded] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const storedImg = React.useMemo(() => img, [img]);
  const fallbackInitials = fallbackText ?? "CO";

  const selectable = [
    assets.img_01,
    assets.img_02,
    assets.img_03,
    assets.img_04,
    assets.img_05,
    assets.img_06,
    assets.img_07,
    assets.img_08,
    assets.img_09,
  ];

  const placeholder = selectable[Math.floor(Math.random() * 9)];
  const fallbackImg = <Image src={assets.img_01} alt="task-manager-img" />

  const imgSize = classNames({
    "uppercase": true,
    "w-8 h-8": size === "sm",
    "w-10 h-10": size === "md",
    "w-20 h-20": size === "lg",
  });

  const getUserImg = React.useCallback(
    async () => {
      if (!storedImg || downloaded) return setIsLoading(false);
      setIsLoading(true);
      try {
        const response = await axios.get(storedImg, { responseType: "blob", timeout: 5000 });
        const blob = await response.data
        const url = URL.createObjectURL(blob);
        setDownloaded(url);
      } catch (error) {
        const err = ensureError(error);
        setError(err);
        console.log(err);
      } finally {
        return setIsLoading(false);
      }
    }, [storedImg, downloaded]);

  React.useEffect(() => {
    getUserImg();
  }, [getUserImg]);

  return (
    <React.Fragment>
      {
        storedImg && !isLoading && error &&
        <Avatar className={imgSize}>
          <AvatarFallback>{fallbackImg}</AvatarFallback>
        </Avatar>
      }
      {
        storedImg && isLoading &&
        <div><Spinner /></div>
      }
      {
        storedImg && !isLoading && !error && !downloaded &&
        <Avatar className={imgSize}>
          <AvatarFallback>{fallbackImg}</AvatarFallback>
        </Avatar>
      }
      {
        !storedImg &&
        <Avatar className={imgSize}>
          <AvatarFallback>{fallbackImg}</AvatarFallback>
        </Avatar>
      }
      {
        storedImg && !isLoading && !error && downloaded &&
        <Avatar className={imgSize}>
          <AvatarImage src={downloaded} alt="@shadcn" className="object-cover" />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>
      }
    </React.Fragment>
  )
});

