import NotificationStatus from "./notification-status";
import Text from "@/components/text";
import { IoNotifications } from "react-icons/io5";

function NotificationsSettings() {
  return (
    <div className="pb-20">
      <Text type="h1" className="text-blue-400 flex items-center">
        <IoNotifications />
        <span className="ms-1">Notifications</span>
      </Text>
      <p className="lg:pe-10 text-gray-400">
        Make modifications to your preferences relating to your
        notifications, change this at anytime based on if you want us
        sending you promotional emails.
      </p>
      <NotificationStatus />
    </div>
  )
}

export default NotificationsSettings;
