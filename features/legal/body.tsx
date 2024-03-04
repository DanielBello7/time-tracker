import TableOfContents from "./table-of-contents";
import { content } from "./content";
export default function Body() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="w-full lg:w-8/12 mx-auto lg:grid grid-cols-3 gap-10">
          <div className="block lg:hidden w-full relative mb-10">
            <TableOfContents />
          </div>
          <div className="col-span-2">
            <h1 className="text-4xl font-bold tracking-tighter">
              This information below will help you better
              understand how we collect, use and handle our data
              amongst other vital need to knows.
            </h1>

            {content.map((item, idx) => (
              <div className="mt-16" key={idx}>
                <h1 className="text-2xl font-bold tracking-tighter mb-4" id={item.id}>
                  {item.title}
                </h1>
                {item.body.map((val, index) => (
                  <p className="text-xl tracking-tight text-gray-500 mb-5" key={index}>
                    {val}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="hidden lg:block w-full sticky">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  )
}

