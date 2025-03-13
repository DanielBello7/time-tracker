import AvatarUpdate from "./avatar-update";
import Text from "@/components/text";
import Profile from "./profile";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileSettings() {
  return (
    <div className="mb-20">
      <Text type="h1" className="text-blue-400 flex items-center">
        <FaUserCircle />
        <span className="ms-1">Profile</span>
      </Text>
      <p className="lg:pe-10 text-gray-400">
        Make modifications to your account here, updating avatar and
        change essential components of your account.
      </p>
      <AvatarUpdate />
      <Profile />
    </div>
  )
}

