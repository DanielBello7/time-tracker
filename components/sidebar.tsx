import { useRouter } from "next/router";
import Link from "next/link";

export default function SideBar() {
    const router = useRouter();
    const currentLocation = router.pathname;

    const data = [
        {
            id: 1,
            title: 'insights',
            route: '/'
        },
        {
            id: 2,
            title: 'tasks',
            route: '/tasks'
        }
    ]

    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            <div className="w-full p-2 border-b border-black">
                <h1 className="uppercase text-3xl font-bold">Time Tracker</h1>
            </div>
            <div className="w-full flex flex-col grow overflow-scroll px-2 pt-2">
                {
                    data.map((item, idx) => {
                        return (
                            <Link
                                key={idx}
                                className={`w-full mb-2 p-2 px-3 rounded capitalize hover:bg-blue-300 font-bold ${currentLocation === item.route && "text-white bg-blue-500"}`}
                                href={item.route}
                            >
                                <p className="">{item.title}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}