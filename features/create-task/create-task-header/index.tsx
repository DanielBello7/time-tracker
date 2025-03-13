import HeaderContainer from "@/components/header-container";
import CreateTaskHeaderOptions from "./options";

export default function CreateTaskHeader() {
  return <HeaderContainer title="Create a new task" right={CreateTaskHeaderOptions} />
}

