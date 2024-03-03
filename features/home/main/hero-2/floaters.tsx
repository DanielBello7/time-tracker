import * as React from "react";
import { assets } from "@/constants";
import FloaterItem from "./floater-item";

export default function Floaters() {
  return (
    <React.Fragment>
      <FloaterItem
        classNames="size-32 -top-32 -left-44"
        img={assets.icon_05}
      />
      <FloaterItem
        classNames="size-16 -top-5 -right-32"
        img={assets.icon_11}
      />
      <FloaterItem
        classNames="size-20 -top-0 -left-0"
        img={assets.icon_04}
      />
      <FloaterItem
        classNames="size-20 top-44 -left-24 size-16"
        img={assets.icon_06}
      />
      <FloaterItem
        classNames="size-20 -top-20 right-10"
        img={assets.icon_07}
      />
      <FloaterItem
        classNames="size-20 top-44 -right-44"
        img={assets.icon_01}
      />
      <FloaterItem
        classNames="size-32 -bottom-20 right-32"
        img={assets.icon_08}
      />
      <FloaterItem
        classNames="size-16 bottom-0 left-24"
        img={assets.icon_02}
      />
      <FloaterItem
        classNames="size-24 -bottom-30 -left-32"
        img={assets.icon_10}
      />
      <FloaterItem
        classNames="size-10 -bottom-30 -right-32"
        img={assets.icon_09}
      />
    </React.Fragment>
  )
}
