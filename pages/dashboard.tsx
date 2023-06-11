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
        <main className='border border-black bg-white w-full h-screen flex overflow-hidden'>
            <div className='w-1/5 h-full border border-black'>
                <SideBar />
            </div>
            <div className="w-4/5 h-full border border-black border-s-0">
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