import { Button } from "@/components/ui/button";
import {
  FaAngleRight,
  FaShieldAlt,
  FaCreditCard
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Closure() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="sm:w-10/12 mx-auto md:grid grid-cols-4 gap-4 space-y-10 sm:space-y-0">
          <motion.div className="col-span-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
          >
            <h1 className="text-3xl font-bold">Ready to get started?</h1>
            <p className="mt-4">
              Dive into a world of seamless organization
              and enhanced productivity with our
              intuitive task manager. Say goodbye to
              the chaos and hello to efficiency as you
              tackle your tasks with ease.
            </p>
            <div className="mt-5 space-x-4">
              <Link href={"/register"}>
                <Button className="bg-black">
                  Start Now
                </Button>
              </Link>

              <Link href={"/docs"}>
                <Button variant={"secondary"}>
                  See Docs
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div className="w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4 }}
          >
            <FaCreditCard size={30} />
            <h1 className="my-3 text-lg font-bold">Completely Free</h1>
            <p>
              Experience the full power of our task
              manager without spending a dime
            </p>
            <Link href={"/docs"} className="cursor-pointer">
              <Button variant={"link"} className="m-0 p-0 text-blue-400">
                <span>See More</span>
                <FaAngleRight />
              </Button>
            </Link>
          </motion.div>

          <motion.div className="w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6 }}
          >
            <FaShieldAlt size={30} />
            <h1 className="my-3 text-lg font-bold">Secure Access</h1>
            <p>
              Your peace of mind is our priority,
              control how your data is accessed.
            </p>
            <Link href={"/docs"} className="cursor-pointer">
              <Button variant={"link"} className="m-0 p-0 text-blue-400">
                <span>See More</span>
                <FaAngleRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

