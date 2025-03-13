import Text from "@/components/text";
import EmailUpdate from "./email-update";
import PasswordUpdate from "./password-update";
import { MdOutlineSecurity } from "react-icons/md";

export default function SecuritySettings() {
  return (
    <div className="pb-44">
      <Text type="h1" className="text-blue-400 flex items-center">
        <MdOutlineSecurity />
        <span className="ms-1">Security</span>
      </Text>
      <p className="lg:pe-10 text-gray-400">
        Update your email attached to your
        account as well as your account password here
      </p>

      <div className="mt-5 mb-16">
        <Text className="text-blue-400">Change Email</Text>
        <p className="lg:pe-10 text-gray-400 text-sm">
          Update your email details
        </p>
        <EmailUpdate />
      </div>

      <div>
        <Text className="text-blue-400">Change Password</Text>
        <p className="lg:pe-10 text-gray-400 text-sm">
          Update your account password
        </p>
        <PasswordUpdate />
      </div>
    </div>
  )
}

