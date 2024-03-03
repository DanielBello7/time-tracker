import NotificationsSettings from "./notification-settings";
import Container from "@/components/container";
import SecuritySettings from "./security-settings";
import ProfileSettings from "./profile-settings";
import SettingsHeader from "./settings-header";

export default function Settings() {
  return (
    <Container header={SettingsHeader} className="w-full md:w-8/12 lg:w-1/2 py-10 p-4" useAnimationContainer={true}>
      <ProfileSettings />
      <NotificationsSettings />
      <SecuritySettings />
    </Container>
  )
}
