import HeaderSearchBar from "@/components/header-search-bar";
import TaskHeaderOptions from "./task-header-options";

export default function TasksHeader() {
  return (
    <div className="w-full flex items-center justify-between px-3 py-2">
      <h1 className="text-xl w-1/4 md:w-7/12 lg:w-8/12">Tasks</h1>
      <div className="flex space-x-1 w-3/4 md:w-5/12 lg:w-4/12">
        <HeaderSearchBar />
        <TaskHeaderOptions />
      </div>
    </div>
  )
}

