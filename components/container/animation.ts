import { Variants } from "framer-motion";

export const container: Variants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.3
    }
  }
}

export const item: Variants = {
  hidden: {
    x: "-10%",
    opacity: 0,
  },
  show: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
}


