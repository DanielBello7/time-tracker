import React from 'react';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export default function LineGraphInsight() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
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
            }
        }
    }

    const labels = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const colors = React.useMemo(() => {
        return { a: Math.random() * 255, b: Math.random() * 255, c: Math.random() * 255, d: Math.random() }
    }, []);

    const output = React.useMemo(() => ({
        labels: labels,
        datasets: [
            {
                label: 'Total Accounts',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                backgroundColor: `rgba(${colors.a}, ${colors.b}, ${colors.c}, ${colors.d})`,
            }
        ]
    }), []);

    return (
        <div className="w-full flex flex-col grow px-3 pt-4 pb-20" style={{ height: '100px' }}>
            <h1 className='text-gray-500 uppercase font-bold mb-1 px-8'>
                Line Graph Insights
            </h1>
            <div className='w-full h-full p-3'>
                <Line
                    options={{ ...options }}
                    width={"100%"}
                    data={output}
                    height={"100%"}
                />
            </div>
        </div>
    )
}