import UserInfo from "@/components/task/user-info";
import SubInfo from "@/components/selected/sub-info";

export default function TaskUserDetails() {
  return (
    <div className="w-full">
      <h1 className="text-2xl">More</h1>
      <p className="mt-2 text-gray-400 text-lg mb-10">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Nemo explicabo nam voluptates, dignissimos.
      </p>
      <UserInfo size="md" />
      <div className="my-5 space-y-3">
        <SubInfo
          msg="Thursday 12th July 2023"
          title="task finished at"
        />
        <SubInfo
          msg="Friday 22nd August 2022"
          title="task started at"
        />
        <SubInfo msg="24 Hours" title="timespent" />
      </div>
    </div>
  )
}

