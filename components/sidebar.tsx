import { useApplicationData } from "@/context/data.context";

export default function SideBar() {
    const { screen, setScreen } = useApplicationData();

    const data = [
        {
            id: 1,
            title: 'insights',
            route: 'insights'
        },
        {
            id: 2,
            title: 'tasks',
            route: 'tasks'
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
                            <button
                                key={idx}
                                className={`w-full text-start mb-2 p-2 px-3 rounded capitalize hover:bg-blue-300 font-bold ${screen === item.route && "text-white bg-blue-500"}`}
                                onClick={() => setScreen(item.route as "insights" | "tasks")}
                            >
                                <p className="">{item.title}</p>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}