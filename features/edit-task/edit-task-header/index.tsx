import HeaderLayout from "@/components/layout/header-layout";
import EditTaskHeaderOptions from "./options";

export default function EditTaskHeader() {
  return <HeaderLayout title="Edit a task" Right={EditTaskHeaderOptions} />
}

