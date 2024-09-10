import React from 'react';
import SideMenu from "../layout/SideMenu";
import BarChart from "./Bar";
import PieChart from "./Pie";
import IconUser from '../../assets/User.svg';
import IconBriefcase from '../../assets/Briefcase.svg';
import IconInfo from '../../assets/Info.svg';

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
      <h1>Statistics</h1>
      <div className="separator"></div>
      <div className="container-statistic">
        <div className="row-stats">
          <BarChart data={eventData} options={chartOptions} />
          <BarChart data={coachClients} options={chartOptions} />
          <PieChart data={genderData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
