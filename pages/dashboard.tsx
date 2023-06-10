import { useApplicationData } from "@/context/data.context";
import { useRouter } from "next/router";
import SideBar from '@/components/sidebar';
import Analytics from "@/screens/analytics";
import React from "react";
import Tasks from "@/screens/tasks";
import Loading from "@/components/loading";

export default function Insights() {
    const [isLoading, setIsLoading] = React.useState(true);
    const { isLoggedIn, user, screen } = useApplicationData();
    const router = useRouter();

    React.useLayoutEffect(() => {
        setIsLoading(true)
        if (!isLoggedIn || !user) router.push("/");
        else setIsLoading(false)
    }, []);

    if (isLoading) return <Loading />

    return (
        <main className='border w-full h-screen flex overflow-hidden'>
            <div className='w-1/5 border border-blue-400 h-full'>
                <SideBar />
            </div>
            <div className="w-4/5 h-full border border-red-500">
                {
                    screen === "insights"
                    && <Analytics />
                }

                {
                    screen === "tasks"
                    && <Tasks />
                }
            </div>
        </main>
    )
}