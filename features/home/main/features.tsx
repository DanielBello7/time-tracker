import * as React from "react";
import { featureItems } from "./feature-items";

export default function Features() {
  return (
    <div className="w-full py-20">
      <div className="border container mx-auto">
        <div className="w-7/12 mb-10 mx-auto text-center">
          <h1 className="text-5xl tracking-tighter font-bold">Features</h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nostrum nam corporis laborum
            officia ipsa quidem placeat inventore eveniet
            minus optio iure nesciunt praesentium sed
            eligendi ea, ullam a, minima debitis?
          </p>
        </div>
        <div className="w-8/12 mx-auto grid grid-cols-3 gap-6">
          {featureItems.map((item) => (
            <div key={item.id} className="bg-black rounded-2xl p-10">
              <p className="text-white mb-5">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
