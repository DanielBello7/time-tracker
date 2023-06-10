import type { InsightDataType } from "@/global";
import { useApplicationData } from "@/context/data.context";
import { useTaskData } from "@/context/tasks.context";
import Loading from "@/components/loading";
import React from "react";

function Insight(props: InsightDataType) {
    return (
        <div className="w-1/3 h-52 p-3">
            <div className="w-full border h-full rounded bg-gray-50 p-3">
                <h1 className="font-bold text-3xl">
                    {props.title}
                </h1>

                <p className="fs-7 text-gray-500">
                    {props.description}
                </p>

                <div className="flex items-end mt-3">
                    <h1 className="me-1 text-2xl font-bold">{props.primaryFigure}</h1>
                    <p className="text-gray-700 mb-1 fs-8">{props.subExpanatory}</p>
                </div>

                <p className="fs-8">
                    {props.additionalInfo}
                </p>
            </div>
        </div>
    )
}

export default function Analytics() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const [data, setData] = React.useState<InsightDataType[]>([]);

    const { axios, user } = useApplicationData();
    const { tasks } = useTaskData();

    React.useEffect(() => {
        async function GetInsights() {
            try {
                const response = await axios.get(`/tasks/insights?email=${user?.email}`);
                setData(response.data.payload);
                return setIsLoading(false);
            }
            catch (error) {
                setIsError(true);
                setError(error as Error);
                return setIsLoading(false);
            }
        }
        GetInsights();
    }, [user, tasks]);

    return (
        <div className="border border-black flex flex-col h-full w-full overflow-hidden">
            <div className="p-2 border-b border-black">
                <h1 className="text-3xl font-bold">Insights</h1>
            </div>
            <div className="w-full flex grow border border-blue-500 overflow-scroll p-3">
                {
                    !isLoading && !isError && data.map((item, idx) => {
                        return <Insight {...item} key={idx} />
                    })
                }

                {
                    !isLoading && !isError && data.length < 1 &&
                    <div className="p-3 font-bold">
                        No insights to show currently
                    </div>
                }

                {
                    isLoading && <Loading />
                }

                {
                    !isLoading && isError &&
                    <div className="p-3 font-bold">Error: {error?.message}</div>
                }
            </div>
        </div>
    )
}