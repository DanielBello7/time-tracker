import { Variants } from "framer-motion";

export const container: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.6,
    }
  }
}

export const item: Variants = {
  hidden: {
    opacity: 0,
    y: "5%"
  },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7
    }
  }
}

