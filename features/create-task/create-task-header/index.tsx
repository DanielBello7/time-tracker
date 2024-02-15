import HeaderLayout from "@/components/layout/header-layout";
import CreateTaskHeaderOptions from "./options";

export default function CreateTaskHeader() {
  return <HeaderLayout title="Create a new task" Right={CreateTaskHeaderOptions} />
}

