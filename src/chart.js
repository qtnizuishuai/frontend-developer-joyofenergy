import * as chartJs from "chart.js";
import { formatPart } from './reading'

let chart;

export const formatDateLabel = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();
  return `${formatPart(day)}/${formatPart(month + 1)}`;
};

export const formatHourLabel = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  return formatPart(hour)
};

export const renderChart = (readings, renderDay = true) => {
  const formatLabelFunc = renderDay ? formatDateLabel : formatHourLabel;
  chartJs.Chart.defaults.font.size = "10px";

  chartJs.Chart.register.apply(
    null,
    Object.values(chartJs).filter((chartClass) => chartClass.id)
  );

  const labels = readings.map(({ time }) => formatLabelFunc(time));
  const values = readings.map(({ value }) => value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "kWh usage",
        data: values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: "#5A8EDA",
        borderRadius: 10,
      },
    ],
  };

  if (chart) {
    chart.destroy();
  }


  chart = new chartJs.Chart("usageChart", {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      },
    });
  };
