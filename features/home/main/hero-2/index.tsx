import { Button } from "@/components/ui/button";
import Link from "next/link";
import Floaters from "./floaters";

export default function Hero2() {
  return (
    <div className="w-full py-16">
      <div className="container mx-auto flex items-center px-20">
        <div className="w-9/12 mx-auto text-center relative">
          <p className="font-bold text-[#4891FF]">#01 SPOTLIGHT</p>
          <div className="text-9xl font-bold tracking-tighter bg-clip-text">
            <h1>Plan Better</h1>
            <h1>Analyse <span className="text-[#4891FF]">Faster.</span></h1>
          </div>
          <div className="text-gray mt-5 text-xl">
            <p>
              Welcome to our revolutionary task
              manager app, where productivity meets simplicity.
              Seamlessly manage your tasks with our
              intuitive interface, designed to empower
              you to achieve your goals effortlessly
            </p>
          </div>
          <div className="mt-5 flex justify-center gap-5">
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
          </div>
          <Floaters />
        </div>
      </div>
    </div>
  )
}

