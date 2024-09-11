import React from 'react';
import SideMenu from "../layout/SideMenu";
import BarChart from "./Bar";
import PieChart from "./Pie";

const Statistics = () => {
  const eventData = {
    labels: ['01 Jul', '05 Jul', '10 Jul', '15 Jul', '20 Jul', '25 Jul', '30 Jul'],
    datasets: [
      {
        label: 'Events',
        data: [12, 19, 3, 5, 7, 6, 10],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const customerGrowthData = {
    labels: ['01 Jul', '05 Jul', '10 Jul', '15 Jul', '20 Jul', '25 Jul', '30 Jul'],
    datasets: [
      {
        label: 'Customers',
        data: [850, 870, 900, 910, 920, 925, 932],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ['Dating App', 'Social Media', 'Referral'],
    datasets: [
      {
        label: 'Meeting Sources',
        data: [205, 192, 45],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
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
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="statistics-page">
      <SideMenu />
      <div className="content">
        <div className="overview">
          <div className="overview-item">
            <h3>Customers</h3>
            <span className="count">932</span>
            <span className="percentage positive">+12.37%</span>
          </div>
          <div className="overview-item">
            <h3>Doing Meetings</h3>
            <span className="count">28.49%</span>
            <span className="percentage negative">-12.37%</span>
          </div>
          <div className="overview-item">
            <h3>Events</h3>
            <span className="count">83</span>
            <span className="percentage positive">+4.63%</span>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart">
            <h4>Customer Growth</h4>
            <BarChart data={customerGrowthData} options={chartOptions} />
          </div>

          <div className="chart">
            <h4>Event Stats</h4>
            <BarChart data={eventData} options={chartOptions} />
          </div>

          <div className="chart">
            <h4>Meeting Top Sources</h4>
            <PieChart data={pieData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
