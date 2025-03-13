import { HiBadgeCheck } from "react-icons/hi";

export default function Success() {
  return (
    <div className="w-full flex justify-center mt-5">
      <HiBadgeCheck
        size={200}
        className="text-green-400"
      />
    </div>
  )
}

