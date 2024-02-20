import Container from "@/components/container";
import SettingsHeader from "./settings-header";
import Text from "@/components/text";
import AvatarUpdate from "./avatar-update";
import Profile from "./profile";
import EmailUpdate from "./email-update";
import NotificationStatus from "./notification-status";

export default function Settings() {
  return (
    <Container header={SettingsHeader} className="w-full md:w-8/12 lg:w-1/2 py-10 p-4">
      <div className="mb-20">
        <Text type="h1" className="text-blue-400">Profile</Text>
        <p className="lg:pe-10 text-gray-400">
          Make modifications to your account here, updating avatar and
          change essential components of your account.
        </p>
        <AvatarUpdate />
        <Profile />
      </div>

      <div className="pb-20">
        <Text type="h1" className="text-blue-400">Notifications</Text>
        <p className="lg:pe-10 text-gray-400">
          Make modifications to your preferences relating to your
          notifications, change this at anytime based on if you want us
          sending you promotional emails.
        </p>
        <NotificationStatus />
      </div>

      <div className="pb-44">
        <Text type="h1" className="text-blue-400">Security</Text>
        <p className="lg:pe-10 text-gray-400">
          Update your email attached to your
          account as well as your account password here
        </p>
        <div className="my-10">
          <Text>Email updates</Text>
          <p className="lg:pe-10 text-gray-400 text-sm">
            Update your email details
          </p>
          <EmailUpdate />
        </div>

        <div>
          <Text>Change Password</Text>
          <p className="lg:pe-10 text-gray-400 text-sm">
            Update your account password
          </p>
          <EmailUpdate />
        </div>
      </div>
    </Container>
  )
}
