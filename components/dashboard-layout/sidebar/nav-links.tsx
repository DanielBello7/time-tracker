import { SiBaremetrics } from "react-icons/si";
import { GrTasks } from "react-icons/gr";
import { MdFolderShared } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

export const nav_links = [
  {
    id: "1",
    title: "FEATURES",
    links: [{
      icon: <SiBaremetrics />,
      id: "metrics",
      title: "Metrics",
      href: "/dashboard"
    },
    {
      icon: <GrTasks />,
      id: "tasks",
      title: "Tasks",
      href: "/dashboard/Tasks"
    },
    {
      icon: <MdFolderShared size={17} />,
      id: "shared-tasks",
      title: "Shared Tasks",
      href: "/dashboard/shared-tasks"
    },
    {
      icon: <IoMdSettings size={18} />,
      id: "settings",
      title: "Settings",
      href: "/dashboard/settings"
    }]
  }
]

