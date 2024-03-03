import type { Variants } from "framer-motion";

export const container: Variants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.5,
      staggerChildren: 0.5
    }
  }
}

export const item: Variants = {
  hidden: {
    opacity: 0,
    scale: 1,
  },
  show: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: 0.7
    }
  }
}
