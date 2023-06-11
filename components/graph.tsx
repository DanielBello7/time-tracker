import React from 'react';
import type { ChartComponentProps } from '@/global';
import {
    Chart as ChartJS,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    Legend,
    LineElement,
    Tooltip,
    CategoryScale,
    LineOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useApplicationData } from '@/context/data.context';
import Loading from './loading';

export default function LineGraphInsight() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const [data, setData] = React.useState<ChartComponentProps | null>(null);

    const { user, axios } = useApplicationData();

    React.useEffect(() => {
        async function GetChartData() {
            setIsLoading(true);

            try {
                const response = await axios.get(`/tasks/chart?id=${user?._id}`);
                setData(response.data.payload);
                setIsError(false);
                setError(null);
                return setIsLoading(false);
            }
            catch (error) {
                setIsError(true);
                setError(error as Error);
                return setIsLoading(false);
            }
        }

        GetChartData();
    }, []);

    return (
        <div className="w-full flex flex-col grow px-3 pt-4 pb-20" style={{ height: '100px' }}>
            <h1 className='text-gray-500 uppercase font-bold mb-1 px-8'>
                Line Graph Insights
            </h1>
            {
                isLoading && <Loading />
            }

            {
                !isLoading && !isError && data &&
                <ChartComponent {...data} />
            }

            {
                !isLoading && isError &&
                <div className='p-3 font-bold text-2xl'>
                    Error occured: {error?.message}
                </div>
            }
        </div>
    )
}

function ChartComponent(props: ChartComponentProps) {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: true,
                grid: {
                    display: true
                }
            },
            x: {
                beginAtZero: true
            }
        }
    }

    const labels = ["Previous Week", "Last Week", "This week",];

    const colors = React.useMemo(() => {
        return {
            bugs: {
                a: Math.random() * 255,
                b: Math.random() * 255,
                c: Math.random() * 255,
                d: Math.random()
            },
            stories: {
                a: Math.random() * 255,
                b: Math.random() * 255,
                c: Math.random() * 255,
                d: Math.random()
            }
        }
    }, []);

    const output = React.useMemo(() => ({
        labels: labels,
        datasets: [
            {
                label: 'Bugs',
                data: [
                    props.bugsInsights.totalTimeSpentPreviousWeek,
                    props.bugsInsights.totalTimeSpentLastWeek,
                    props.bugsInsights.totalTimeSpentThisWeek
                ],
                backgroundColor: `rgba(${colors.bugs.a}, ${colors.bugs.b}, ${colors.bugs.c}, ${colors.bugs.d})`,
                borderColor: `rgba(${colors.bugs.a}, ${colors.bugs.b}, ${colors.bugs.c}, ${colors.bugs.d})`,
            },
            {
                label: 'Stories',
                data: [
                    props.storiesInsights.totalTimeSpentPreviousWeek,
                    props.storiesInsights.totalTimeSpentLastWeek,
                    props.storiesInsights.totalTimeSpentThisWeek
                ],
                backgroundColor: `rgba(${colors.stories.a}, ${colors.stories.b}, ${colors.stories.c}, ${colors.stories.d})`,
                borderColor: `rgba(${colors.stories.a}, ${colors.stories.b}, ${colors.stories.c}, ${colors.stories.d})`,
            },
        ]
    }), []);

    return (
        <div className='w-full h-full p-3'>
            <Line
                options={{ ...options }}
                width={"100%"}
                data={output}
                height={"100%"}
            />
        </div>
    )
}