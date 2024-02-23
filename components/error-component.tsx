import { assets } from "@/constants";
import { Button } from "./ui/button";
import Image from "next/image";
import Text from "./text";
import * as React from "react";
import ensureError from "@/lib/ensure-error";

type ErrorComponentProps = {
  error?: unknown
  refresh?: () => void
}

export default function ErrorComponent({ error, refresh }: ErrorComponentProps) {
  const [converted, setConverted] = React.useState<Error>({} as Error);

  const click = () => {
    refresh && refresh();
  }

  React.useLayoutEffect(() => {
    if (!error) return
    if (error instanceof Error) return setConverted(error);
    const err = ensureError(error);
    setConverted(err);
  }, [error]);

  return (
    <div className="col-span-6 w-full h-full flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Image src={assets.img_c} className="w-4/12" alt="error-occured" />
        <div className="text-center">
          <p className="font-bold text-3xl text-red-600">Error Occured</p>
          <Text type="sub">{converted.message}</Text>
          <Button variant="link" className="underline" onClick={click}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}

