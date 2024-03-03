import * as React from "react";
import { featureItems } from "./feature-items";
import { HoverEffect } from "./card-hover-effect";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <div className="w-full py-20 pt-44">
      <div className="container mx-auto">
        <div className="w-7/12 mb-10 mx-auto text-center">
          <motion.h1 className="text-5xl tracking-tighter font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h1>
          <motion.p className="text-xl mt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            Discover the power and versatility of our
            task manager's cutting-edge features.
            Streamline your workflow and elevate your
            productivity with an array of functionalities
            tailored to meet your needs.
          </motion.p>
        </div>
        <div className="w-8/12 mx-auto">
          <HoverEffect items={featureItems} />
        </div>
      </div>
    </div>
  )
}
