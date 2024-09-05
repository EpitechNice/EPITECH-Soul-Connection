<template>
    <div class="pages">
      <h1>Statistics</h1>
      <div class="separator"></div>
      <div class="container-statistic">
        <div class="row">
          <div class="card" id="cardclient">
            <img src="../assets/User.svg" />
            <p>2500</p>
            <p>Total Users</p>
          </div>
          <div class="card" id="cardcoach">
            <img src="../assets/User.svg" />
            <p>2500</p>
            <p>Total coachs</p>
          </div>
          <div class="card" id="cardrdv">
            <img src="../assets/Briefcase.svg" />
            <p>2500</p>
            <p>Total Event</p>
          </div>
          <div class="card" id="cardtips">
            <img src="../assets/Info.svg" />
            <p>2500</p>
            <p>Total tips</p>
          </div>
        </div>
        <div class="row">
          <BarChart :data="eventData" :options="chartOptions" />
          <BarChart :data="coachClients" :options="chartOptions" />
          <PieChart :data="genderData" :options="pieChartOptions" />

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BarChart from '~/components/BarChart.vue';
  import PieChart from '~/components/PieChart.vue';
  
  export default {
    components: {
      BarChart,
      PieChart
    },
    data() {
      return {
        eventData: {
          labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
          datasets: [
            {
              label: 'Nombre d\'événements',
              data: [12, 19, 3, 5, 2, 3, 7],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        coachClients: {
          labels: ['Coach 1', 'Coach 2', 'Coach 3', 'Coach 4', 'Coach 5'],
          datasets: [
            {
              label: 'Nombre de clients',
              data: [12, 19, 3, 5, 2],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        genderData: {
          labels: ['Hommes', 'Femmes'],
          datasets: [
            {
              label: 'Répartition des genres',
              data: [1500, 1000],
              backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1
            }
          ]
        },
        chartOptions: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
        pieChartOptions: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw;
                }
              }
            }
          }
        }
      };
    }
  };
  </script>
  
  <style src="assets/css/statistic.css"></style>