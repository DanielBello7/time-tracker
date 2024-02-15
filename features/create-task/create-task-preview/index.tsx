import SubInfo from "@/components/selected/sub-info";
import UserInfo from "@/components/task/user-info";
import Text from "@/components/text";
import { Badge } from "@/components/ui/badge";

export default function CreateTaskPreview() {
  const date = new Date().toLocaleDateString("en-us", { dateStyle: "full" });
  return (
    <div className="w-full py-10">
      <Text type="sub">Preview</Text>
      <div className="mt-3">
        <p className="text-sm text-[#4891FF]">
          #TASK 289081
        </p>
        <p className="text-3xl mt-1">Bug Removal</p>
        <Text type="sub">{date}</Text>
        <Badge variant={"destructive"} className="my-4">
          Story
        </Badge>

        <p className="text-[#64748B]">
          Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Explicabo sed nemo et deleniti porro harum
          vel impedit doloremque beatae, nisi eius quas laborum
          corrupti, placeat nobis officiis sint, omnis ipsum!
        </p>

        <div className="mt-5">
          <p className="text-sm text-[#4891FF]">TAGS</p>
          <div className="mt-2">
            <Badge className="me-2 mb-2" variant={"secondary"}>Javascript</Badge>
            <Badge className="me-2 mb-2" variant={"secondary"}>Typescript</Badge>
            <Badge className="me-2 mb-2" variant={"secondary"}>Data Pages</Badge>
            <Badge className="me-2 mb-2" variant={"secondary"}>Algorithms</Badge>
          </div>
        </div>

        <div className="mt-4">
          <UserInfo size={"md"} />
          <div className="mt-5 space-y-3">
            <SubInfo
              msg="Thursday 13th July 2023"
              title="task finished at"
            />
            <SubInfo
              msg="Wednesday 23rd June 2023"
              title="task started at"
            />
            <SubInfo
              msg="24 Hours"
              title="timespent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// #0036C1 bold outline
// #4891FF bg light