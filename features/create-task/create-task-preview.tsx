import UserInfo from "@/components/task-user-info";
import SubInfo from "@/components/sub-info";
import Text from "@/components/text";
import getDate from "@/lib/get-date";
import * as React from "react";
import { useCreateTask } from "./context";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";

export default function CreateTaskPreview() {
  const { user } = useAppSelector((state) => state.user);
  const { formData, setFormData } = useCreateTask();
  const tempId = React.useMemo(() => Math.floor(Math.random() * 99999), []);

  const remove = (id: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, idx) => idx !== id)
    });
  }
  return (
    <div className="w-full py-10">
      <Text type="sub">Preview</Text>
      <div className="mt-3">
        <p className="text-sm text-[#4891FF]">
          #TASK {tempId}
        </p>
        <p className="text-3xl mt-1">
          {
            !formData.title.trim()
              ? "Bug Removal"
              : formData.title
          }
        </p>
        <Text type="sub">{getDate()}</Text>
        <Badge variant={formData.type === "story" ? "destructive" : "default"} className="my-4 capitalize">
          {formData.type}
        </Badge>

        <p className="text-[#64748B]">
          {
            !formData.body.trim()
              ?
              `Lorem ipsum dolor sit, amet consectetur 
              adipisicing elit. Explicabo sed nemo et deleniti 
              porro harum vel impedit doloremque beatae, 
              nisi eius quas laborum corrupti, placeat 
              nobis officiis sint, omnis ipsum!`
              :
              (formData.body).split("\n").map((item, idx) => (
                <p key={idx} className="mb-5">{item}</p>
              ))
          }
        </p>

        <div className="mt-5">
          <p className="text-sm text-[#4891FF]">TAGS</p>
          <div className="mt-2">
            {
              formData.tags.length < 1
                ?
                ["Javascript", "Typescript", "Data Pages", "Algorithms"].map((item, idx) => (
                  <Badge className="me-2 mb-2" variant={"secondary"} key={idx}>
                    {item}
                  </Badge>
                ))
                :
                formData.tags.map((item, idx) => (
                  <Badge className="me-2 mb-2 cursor-pointer" variant={"secondary"} key={idx}
                    onClick={() => remove(idx)}>
                    {item}
                  </Badge>
                ))
            }
          </div>
        </div>

        <div className="mt-4">
          <UserInfo
            size={"md"}
            email={user.email}
            img={user.avatar}
            name={user.name}
          />

          <div className="mt-5 space-y-3">
            <SubInfo
              msg={getDate(formData.dateFinished)}
              title="task finished at"
            />
            <SubInfo
              msg={getDate(formData.dateStarted)}
              title="task started at"
            />
            <SubInfo
              msg={`${formData.timeSpent} ${formData.timeInterval}`}
              title="timespent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

