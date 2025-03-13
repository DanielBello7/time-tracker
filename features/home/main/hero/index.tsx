import { Button } from "@/components/ui/button";
import HeroCard from "./hero-card";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full py-16">
      <div className="container mx-auto flex items-center px-20">
        <div className="w-7/12">
          <p className="font-bold text-[#4891FF]">#SPOTLIGHT</p>
          <div className="text-8xl font-bold tracking-tighter bg-clip-text">
            <h1>Plan Better</h1>
            <h1>Analyse <span className="text-[#4891FF]">Faster.</span></h1>
          </div>
          <div className="text-gray mt-5 text-xl pe-10">
            <p>
              Welcome to our revolutionary task
              manager app, where productivity meets simplicity.
              Seamlessly manage your tasks with our
              intuitive interface, designed to empower
              you to achieve your goals effortlessly
            </p>
          </div>
          <div className="mt-5 flex gap-5">
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
        </div>

        <div className="w-5/12 grid grid-cols-3 gap-6">
          <HeroCard />
          <div className="col-span-2">
            <HeroCard />
          </div>
          <div className="col-span-2">
            <HeroCard />
          </div>
          <HeroCard />
        </div>
      </div>
    </div>
  )
}

