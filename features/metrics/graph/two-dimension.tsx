import * as React from "react";
import { Line } from 'react-chartjs-2';
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


export default function TwoDimension() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
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
        data: [1, 2, 3],
        backgroundColor: `rgba(${colors.bugs.a}, ${colors.bugs.b}, ${colors.bugs.c}, ${colors.bugs.d})`,
        borderColor: `rgba(${colors.bugs.a}, ${colors.bugs.b}, ${colors.bugs.c}, ${colors.bugs.d})`,
      },
      {
        label: 'Stories',
        data: [3, 4, 5],
        backgroundColor: `rgba(${colors.stories.a}, ${colors.stories.b}, ${colors.stories.c}, ${colors.stories.d})`,
        borderColor: `rgba(${colors.stories.a}, ${colors.stories.b}, ${colors.stories.c}, ${colors.stories.d})`,
      },
    ]
  }), []);

  return (
    <div className='w-full h-[430px] p-3 py-6'>
      <Line
        options={{ ...options }}
        width={"100%"}
        data={output}
        height={"100%"}
      />
    </div>
  )
}


