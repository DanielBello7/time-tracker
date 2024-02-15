import Container from "@/components/container";
import SettingsHeader from "./settings-header";
import Text from "@/components/text";
import AvatarUpdate from "./avatar-update";
import Profile from "./profile";
import EmailUpdate from "./email-update";
import NotificationStatus from "./notification-status";

export default function Settings() {
  return (
    <Container header={SettingsHeader} className="w-full lg:w-1/2 py-10">
      <div className="mb-20">
        <Text type="h1">Profile</Text>
        <p className="lg:pe-10 text-gray-400">
          Lorem ipsum dolor sit
          amet consectetur, adipisicing elit.
          Laboriosam delectus, expedita et a iusto sit
          explicabo impedit.
        </p>
        <AvatarUpdate />
        <Profile />
      </div>

      <div className="pb-44">
        <Text>Notifications</Text>
        <p className="lg:pe-10 text-gray-400">
          Lorem ipsum dolor sit
          amet consectetur, adipisicing elit.
          Laboriosam delectus, expedita et a iusto sit
          explicabo impedit.
        </p>
        <EmailUpdate />
        <NotificationStatus />
      </div>
    </Container>
  )
}
