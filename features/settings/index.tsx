import ScreenLayout from "@/components/layout/screen-layout";
import SettingsHeader from "./settings-header";
import AvatarUpdate from "./avatar-update";
import Profile from "./profile";
import EmailUpdate from "./email-update";
import NotificationStatus from "./notification-status";

export default function Settings() {
  return (
    <ScreenLayout header={<SettingsHeader />} useGrid={false} className="block lg:flex">
      <div className="w-full lg:w-1/2 py-10 px-2">
        <div className="mb-20">
          <h1 className="text-2xl">
            Profile
          </h1>
          <p className="lg:pe-10 text-gray-400">
            Lorem ipsum dolor sit
            amet consectetur,
            adipisicing elit.
            Laboriosam delectus,
            expedita et a iusto sit
            explicabo impedit.
          </p>
          <AvatarUpdate />
          <Profile />
        </div>

        <div className="pb-44">
          <h1 className="text-2xl">
            Notifications
          </h1>
          <p className="lg:pe-10 text-gray-400">
            Lorem ipsum dolor sit
            amet consectetur,
            adipisicing elit.
            Laboriosam delectus,
            expedita et a iusto sit
            explicabo impedit.
          </p>
          <EmailUpdate />
          <NotificationStatus />
        </div>
      </div>
    </ScreenLayout>
  )
}
