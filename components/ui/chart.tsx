"use client"

import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController,
} from "chart.js"
import { useMemo } from "react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController,
)

interface ChartProps {
  data: { name: string; total: number }[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  layout?: "vertical" | "horizontal"
  yAxisWidth?: number
  height?: number
}

export function BarChart(props: ChartProps) {
  const { data, index, categories, colors, valueFormatter, layout, yAxisWidth, height } = props

  const chartData = useMemo(() => {
    return {
      labels: data.map((item) => item[index]),
      datasets: categories.map((category, i) => ({
        label: category,
        data: data.map((item) => item[category]),
        backgroundColor: colors[i % colors.length],
      })),
    }
  }, [data, index, categories, colors])

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      indexAxis: layout === "vertical" ? "y" : "x",
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            callback: (value: number) => (valueFormatter ? valueFormatter(value) : value),
          },
          ...(yAxisWidth
            ? {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 20,
                },
              }
            : {}),
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            boxWidth: 12,
            padding: 20,
            color: "#333",
            useBorderRadius: true,
            borderRadius: 5,
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.dataset.label || ""

              if (label) {
                label += ": "
              }
              if (context.parsed.y !== null) {
                label += valueFormatter ? valueFormatter(context.parsed.y) : context.parsed.y
              }
              return label
            },
          },
        },
      },
      layout: {
        padding: {
          bottom: -20,
        },
      },
    }
  }, [valueFormatter, layout, yAxisWidth])

  return <Bar data={chartData} options={options} height={height} />
}

export function LineChart(props: ChartProps) {
  const { data, index, categories, colors, valueFormatter, yAxisWidth, height } = props

  const chartData = useMemo(() => {
    return {
      labels: data.map((item) => item[index]),
      datasets: categories.map((category, i) => ({
        label: category,
        data: data.map((item) => item[category]),
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length],
        tension: 0.4,
        fill: false,
        pointRadius: 4,
      })),
    }
  }, [data, index, categories, colors])

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            callback: (value: number) => (valueFormatter ? valueFormatter(value) : value),
          },
          ...(yAxisWidth
            ? {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 20,
                },
              }
            : {}),
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            boxWidth: 12,
            padding: 20,
            color: "#333",
            useBorderRadius: true,
            borderRadius: 5,
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.dataset.label || ""

              if (label) {
                label += ": "
              }
              if (context.parsed.y !== null) {
                label += valueFormatter ? valueFormatter(context.parsed.y) : context.parsed.y
              }
              return label
            },
          },
        },
      },
      layout: {
        padding: {
          bottom: -20,
        },
      },
    }
  }, [valueFormatter, yAxisWidth])

  return <Line data={chartData} options={options} height={height} />
}
