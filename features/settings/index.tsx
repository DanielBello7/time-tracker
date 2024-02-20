import Container from "@/components/container";
import SettingsHeader from "./settings-header";
import Text from "@/components/text";
import AvatarUpdate from "./avatar-update";
import Profile from "./profile";
import EmailUpdate from "./email-update";
import NotificationStatus from "./notification-status";

export default function Settings() {
  return (
    <Container header={SettingsHeader} className="w-full md:w-8/12 lg:w-1/2 py-10">
      <div className="mb-20">
        <Text type="h1">Profile</Text>
        <p className="lg:pe-10 text-gray-400">
          Make modifications to your account
          here, updating avatar and change
          essential components of your account.
        </p>
        <AvatarUpdate />
        <Profile />
      </div>

      <div className="pb-44">
        <Text>Notifications</Text>
        <p className="lg:pe-10 text-gray-400">
          Make modifications to your
          preferences relating to your
          notifications, change this at anytime
          based on if you want us
          sending you promotional emails.
        </p>
        <EmailUpdate />
        <NotificationStatus />
      </div>
    </Container>
  )
}
