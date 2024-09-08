import React, { useRef, useEffect } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null); // Track the Chart.js instance

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // If a chart instance exists, destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
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
      <canvas ref={canvasRef} style={{ maxWidth: '600px' }}></canvas>
    </div>
  );
};

export default PieChart;
