import { HiBadgeCheck } from "react-icons/hi";
import { FaLock } from "react-icons/fa";


export default function Success() {
  return (
    <div className="w-full flex justify-center md:-mt-5">
      <div className="relative">
        <FaLock size={200} />
        <HiBadgeCheck className="text-green-400 absolute top-0 right-0" size={100} />
      </div>
    </div>
  )
}

