import * as React from "react";
import { featureItems } from "./feature-items";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Features() {
  return (
    <div className="w-full py-20 pt-44">
      <div className="container mx-auto">
        <div className="w-7/12 mb-20 mx-auto text-center">
          <h1 className="text-5xl tracking-tighter font-bold">Features</h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nostrum nam corporis laborum
            officia ipsa quidem placeat inventore eveniet
            minus optio iure nesciunt praesentium sed
            eligendi ea, ullam a, minima debitis?
          </p>
        </div>
        <div className="w-8/12 mx-auto">
          <HoverEffect items={featureItems} />
        </div>
      </div>
    </div>
  )
}
