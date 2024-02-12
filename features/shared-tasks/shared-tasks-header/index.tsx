import HeaderSearchBar from "@/components/header-search-bar";
import SharedTaskHeaderOptions from "./shared-tasks-header-options";

export default function SharedTasksHeader() {
  return (
    <div className="w-full border flex p-3 py-2 items-center justify-between">
      <h1 className="text-xl w-1/4 md:w-7/12 lg:w-8/12">Shared Tasks</h1>
      <div className="flex space-x-1 w-3/4 md:w-5/12 lg:w-4/12">
        <HeaderSearchBar />
        <SharedTaskHeaderOptions />
      </div>
    </div>
  )
}

