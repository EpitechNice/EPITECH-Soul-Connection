import React from 'react';
import SideMenu from "../layout/SideMenu";
import BarChart from "./Bar";
import PieChart from "./Pie";

const Statistics = () => {
  const eventData = {
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
  };

  const coachClients = {
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
  };

  const genderData = {
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
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const pieChartOptions = {
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
  };

  return (
    <div className="pages">
      <div className="col-12 col-lg-3">
        <SideMenu />
      </div>
      <h1 className="text-center mt-1">Statistics</h1>
      <div className="separator"></div>
      <div className="container-statistic">
        <div className="row">
          <div className="card" id="cardclient">
            <img src="../assets/User.svg" alt="User" />
            <p>2500</p>
            <p>Total Users</p>
          </div>
          <div className="card" id="cardcoach">
            <img src="../assets/User.svg" alt="Coach" />
            <p>2500</p>
            <p>Total Coaches</p>
          </div>
          <div className="card" id="cardrdv">
            <img src="../assets/Briefcase.svg" alt="Events" />
            <p>2500</p>
            <p>Total Events</p>
          </div>
          <div className="card" id="cardtips">
            <img src="../assets/Info.svg" alt="Tips" />
            <p>2500</p>
            <p>Total Tips</p>
          </div>
        </div>
        <div className="row">
          <BarChart data={eventData} options={chartOptions} />
          <BarChart data={coachClients} options={chartOptions} />
          <PieChart data={genderData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
