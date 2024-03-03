import { Separator } from "@/components/ui/separator";
import { Variants, motion } from "framer-motion";
import classNames from "classnames";
import * as React from "react";
import { container } from "./animation";

type DashboardBodyLayoutProps = {
  header?: React.ReactElement | (() => React.ReactElement) | null
  children?: React.ReactElement[] | React.ReactElement
  grid?: boolean
  className?: string
  useAnimationContainer?: boolean
  animationVariants?: Variants
}

export default function Container({
  header: Header, children, grid = false, className, useAnimationContainer = false, animationVariants
}: DashboardBodyLayoutProps) {
  const gridclass = classNames({
    "overflow-y-scroll overflow-x-hidden": true,
    "w-full p-3": true,
    "grow": true,
    "grid grid-cols-1 md:grid-cols-2": grid ? true : false,
    "lg:grid-cols-3": grid ? true : false,
    "xl:grid-cols-4 gap-3": grid ? true : false,
    "md:gap-3 lg:gap-3 content-start": grid ? true : false
  }, className);

  return (
    <React.Fragment>
      {
        Header &&
          typeof Header === "function"
          ? <Header />
          : Header
      }
      {
        Header &&
        <Separator className="border-b" />
      }
      {
        useAnimationContainer
          ?
          <motion.div className={gridclass} variants={animationVariants ?? container} initial="hidden" animate="show" exit="hidden" viewport={{ once: true }}>
            {children}
          </motion.div>
          :
          <div className={gridclass}>
            {children}
          </div>
      }
    </React.Fragment>
  )
}

