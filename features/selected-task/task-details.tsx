import { Badge } from "@/components/ui/badge";

const tags = [
  "Typescript", "Javascript", "Python", "Networks",
  "Neural", "Algorithms", "Project",
  "Documentation", "Documents", "Files"
]

export default function TaskDetails() {
  const date = new Date().toLocaleDateString("en-us", {
    dateStyle: "full"
  });
  return (
    <div className="w-full">
      <p className="text-[#4891FF]">#TASK 197131</p>
      <h1 className="text-3xl mt-2">
        Bug Removal
      </h1>
      <p className="text-gray-400 text-xs">
        {date}
      </p>
      <div className="space-x-2 my-3">
        <Badge>Bug</Badge>
        <Badge variant={"outline"}>Edited</Badge>
      </div>
      <div className="lg:pe-10">
        <p className="text-lg text-gray-400">
          Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Rem magnam ducimus consectetur
          obcaecati voluptates tempore pariatur et maiores,
          dolore dolores cupiditate unde praesentium
          eius fuga amet. In modi quas corporis?
        </p>
      </div>
      <div className="mt-5 lg:pe-10">
        <p className="text-[#4891FF]">TAGS</p>
        <div className="flex items-center flex-wrap my-2">
          {tags.map((item, idx) => (
            <Badge key={idx} variant={"secondary"}
              className="mb-2 capitalize me-2">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

