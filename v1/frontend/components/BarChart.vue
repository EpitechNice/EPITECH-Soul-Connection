<template>
    <div>
      <canvas ref="barChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
  
  Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
  export default {
    name: 'BarChart',
    props: {
      data: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.barChart.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: this.data,
          options: this.options
        });
      }
    }
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 600px;
  }
  </style>