import * as React from "react";
import { featureItems } from "./feature-items";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Features() {
  return (
    <div className="w-full py-20 pt-44">
      <div className="container mx-auto">
        <div className="w-7/12 mb-10 mx-auto text-center">
          <h1 className="text-5xl tracking-tighter font-bold">Features</h1>
          <p className="text-xl mt-5">
            Discover the power and versatility of our
            task manager's cutting-edge features.
            Streamline your workflow and elevate your
            productivity with an array of functionalities
            tailored to meet your needs.
          </p>
        </div>
        <div className="w-8/12 mx-auto">
          <HoverEffect items={featureItems} />
        </div>
      </div>
    </div>
  )
}
