import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { container } from "./animate";
import Link from "next/link";
import Floaters from "./floaters";

export default function Hero2() {
  return (
    <div className="w-full lg:py-16">
      <div className="container mx-auto flex items-center lg:px-20">
        <motion.div className="w-full lg:w-9/12 mx-auto text-center relative" variants={container} initial="hidden" animate="show">
          <motion.p
            className="font-bold text-[#4891FF]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            #01 SPOTLIGHT
          </motion.p>
          <div className="text-7xl sm:text-8xl xl:text-9xl font-bold tracking-tighter bg-clip-text">
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              Plan Better
            </motion.h1>
            <h1>
              <motion.span
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.7 }}
              >
                Analyse
              </motion.span>
              <motion.span className="text-[#4891FF]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
              > Faster.
              </motion.span>
            </h1>
          </div>
          <div className="text-gray mt-5 text-lg sm:text-xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
            >
              Welcome to our revolutionary task
              manager app, where productivity meets simplicity.
              Seamlessly manage your tasks with our
              intuitive interface, designed to empower
              you to achieve your goals effortlessly
            </motion.p>
          </div>
          <motion.div className="mt-5 flex justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
          >
            <Link href={"/sign-in"}>
              <Button variant={"secondary"}>
                Sign In
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button variant={"default"} className="bg-black">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
          <Floaters />
        </motion.div>
      </div>
    </div>
  )
}

