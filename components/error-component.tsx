import { assets } from "@/constants";
import Image from "next/image";
import Text from "./text";
import { Button } from "./ui/button";

export default function ErrorComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Image src={assets.img_c} className="w-4/12" alt="error-occured" />
        <div className="text-center">
          <p className="font-bold text-3xl text-red-600">Error Occured</p>
          <Text type="sub">Account unable to process data</Text>
          <Button variant="link" className="underline">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}

