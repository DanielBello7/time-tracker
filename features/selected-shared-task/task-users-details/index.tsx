import SubInfo from "@/components/selected/sub-info";
import UserInfo from "@/components/task/user-info";

export default function TaskUsersDetails() {
  return (
    <div className="w-full">
      <h1 className="text-2xl">More</h1>
      <p className="mt-2 text-gray-400 text-lg mb-10">
        Lorem ipsum dolor sit, amet
        consectetur adipisicing
        elit.
        Nemo explicabo nam voluptates,
        dignissimos.
      </p>
      <div className="my-10">
        <h1 className="text-xl text-red-400 pb-3">From</h1>
        <UserInfo size="md" />
        <div className="my-5 space-y-3">
          <SubInfo msg="Monday 3rd August 2023" title="task finished at" />
          <SubInfo msg="Wednesday 14th Febuary 2023" title="task started at" />
          <SubInfo msg="24 Hours" title="timespent" />
          <SubInfo msg="Thursday 15th July 2023" title="task sent at" />
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-xl text-red-400 pb-3">To</h1>
        <UserInfo size="md" />
        <div className="my-5 space-y-3 pb-10">
          <SubInfo msg="Friday 20th July 2023" title="read at" />
        </div>
      </div>
    </div>
  )
}

