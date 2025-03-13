import { Variants } from "framer-motion";

export const container: Variants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.9
    }
  }
}

export const item: Variants = {
  hidden: {
    scale: 0.98,
    opacity: 0.6,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8
    }
  }
}

