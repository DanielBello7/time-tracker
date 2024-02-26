export default function Body() {
  const content = [
    "adipisicing elit. Voluptates explicabo aspernatur",
    "consectetur eius sapiente ipsam sit",
    "beatae vel officiis voluptatum, at expedita minus",
    "dolorum pariatur? Tempora, tempore?",
    "Dolor, mollitia ad!"
  ]
  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="w-8/12 mx-auto grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold tracking-tighter">
              This Privacy Policy will help you better
              understand how we collect. use and share vour
              personal information.
            </h1>

            <p className="text-xl tracking-tight text-gray-500 mt-10">
              Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum at adipisci sint
              explicabo nisi nesciunt esse, mollitia
              nulla modi deserunt? Ipsam fugiat nemo,
              perspiciatis dolore assumenda quo est
              sapiente hic?
              Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum at adipisci sint
              explicabo nisi nesciunt esse, mollitia
              nulla modi deserunt? Ipsam fugiat nemo,
              perspiciatis dolore assumenda quo est
              sapiente hic?
            </p>

            <p className="text-xl tracking-tight text-gray-500 mt-10">
              Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum at adipisci sint
              explicabo nisi nesciunt esse, mollitia
              nulla modi deserunt? Ipsam fugiat nemo,
              perspiciatis dolore assumenda quo est
              sapiente hic?
              Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum at adipisci sint
              explicabo nisi nesciunt esse, mollitia
              nulla modi deserunt? Ipsam fugiat nemo,
              perspiciatis dolore assumenda quo est
              sapiente hic?
            </p>

            <h1 className="text-2xl font-bold tracking-tighter mt-10">Privacy Policy</h1>

            <p className="text-xl tracking-tight text-gray-500 mt-5">
              Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum at adipisci sint
              explicabo nisi nesciunt esse, mollitia
              nulla modi deserunt? Ipsam fugiat nemo,
              perspiciatis dolore assumenda quo est
              sapiente hic?
              Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum at adipisci sint
              explicabo nisi nesciunt esse, mollitia
              nulla modi deserunt? Ipsam fugiat nemo,
              perspiciatis dolore assumenda quo est
              sapiente hic?
            </p>
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold tracking-tighter mb-10">Table of contents</h1>
            {content.map((item, idx) => (
              <div className="flex mb-3">
                <span className="text-xl tracking-tighter pe-2">{idx + 1}</span>
                <p className="capitalize underline text-xl tracking-tighter">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

