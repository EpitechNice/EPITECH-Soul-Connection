import React, { useRef, useEffect } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ maxWidth: '600px' }}></canvas>
    </div>
  );
};

export default PieChart;
