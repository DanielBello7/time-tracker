import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FaAngleLeft } from "react-icons/fa";

export default function Back() {
  const router = useRouter();
  const click = () => {
    router.back();
  }
  return (
    <Button variant={"link"} className="underline space-x-1 p-0" onClick={click}>
      <FaAngleLeft />
      <span>Back</span>
    </Button>
  )
}

