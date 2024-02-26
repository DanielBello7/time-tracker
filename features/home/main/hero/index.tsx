import { Button } from "@/components/ui/button";
import HeroCard from "./hero-card";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full border py-16">
      <div className="container mx-auto flex items-center px-20">
        <div className="w-7/12">
          <p className="font-bold text-[#4891FF]">#SPOTLIGHT</p>
          <div className="text-8xl font-bold tracking-tighter bg-clip-text">
            <h1>Plan Better</h1>
            <h1>Analyse Faster.</h1>
          </div>
          <div className="text-gray mt-1 text-xl">
            <p>
              Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum voluptatibus ea
              animi possimus molestias asperiores, iure
              tenetur vitae atque quae iste aut
              omnis ipsum ducimus blanditiis, cumque unde molestiae fugiat.
            </p>
          </div>
          <div className="mt-5 flex gap-5">
            <Link href={"/sign-in"}>
              <Button variant={"secondary"}>
                Sign In
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button variant={"default"} className="bg-black">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-5/12 relative px-2">
          <HeroCard />
        </div>
      </div>
    </div>
  )
}

