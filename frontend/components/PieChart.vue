<template>
    <div>
      <canvas ref="pieChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
  
  Chart.register(PieController, ArcElement, Tooltip, Legend);
  
  export default {
    name: 'PieChart',
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
        const ctx = this.$refs.pieChart.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
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