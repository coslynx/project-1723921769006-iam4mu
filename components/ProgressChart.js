"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Goal {
  id: number;
  name: string;
  target: string;
  start_date: string;
  end_date: string;
  user_id: number;
}

interface ProgressData {
  date: string;
  value: number;
}

interface ProgressChartProps {
  goals: Goal[];
}

export default function ProgressChart({ goals }: ProgressChartProps) {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const progressData = await Promise.all(
          goals.map(async (goal) => {
            const { data: progress } = await fetch(
              `/api/progress?goalId=${goal.id}`
            ).then((res) => res.json());
            return progress;
          })
        );

        const labels = [
          ...new Set(
            progressData
              .flatMap((data) => data)
              .map((data: ProgressData) => data.date)
          ),
        ].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        const datasets = goals.map((goal, index) => ({
          label: goal.name,
          data: labels.map((label) => {
            const progressValue = progressData[index].find(
              (data: ProgressData) => data.date === label
            )?.value;
            return progressValue ? parseFloat(progressValue) : null;
          }),
          borderColor: `hsl(${index * 30 + 20}, 70%, 50%)`,
          borderWidth: 2,
        }));

        setChartData({ labels, datasets });
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchData();
  }, [goals]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Progress Chart",
      },
    },
  };

  return (
    <div className="w-full max-w-2xl">
      <Line data={chartData} options={options} />
    </div>
  );
}