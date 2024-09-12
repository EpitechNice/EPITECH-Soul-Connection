import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LineChart = ({ data, options }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Track the Chart.js instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // If a chart instance exists, destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    // Cleanup function to destroy the chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]); // Recreate the chart if data or options change

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;