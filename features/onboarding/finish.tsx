import Image from "next/image";
import { assets } from "@/constants";
import Text from "@/components/text";

export default function Finish() {
  return (
    <div className="w-full flex flex-col items-center">
      <Text className="text-4xl font-bold tracking-tighter">That's It!!</Text>
      <Image
        src={assets.img_d}
        alt="welcome"
        className="w-6/12 my-5"
      />
    </div>
  )
}

