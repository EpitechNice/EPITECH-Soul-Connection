import React, { useEffect, useState, useRef } from 'react';
import SideMenu from "../layout/SideMenu";
import BarChart from "./Bar";
import PieChart from "./Pie";
import LineChart from './Line';
import { useGetEventsQuery } from '../../redux/api/eventApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

const Statistics = () => {
  const { data, isLoading, error, isError } = useGetEventsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  const eventArray = Array.isArray(data) ? data : data?.events || [];
  // Count events per day
  const eventCountByDate = eventArray.reduce((acc, event) => {
    const date = event.date.split('T')[0]; // Assuming date is in ISO format
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const eventData = {
    labels: Object.keys(eventCountByDate),
    datasets: [
      {
        label: 'Number of Events',
        data: Object.values(eventCountByDate),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 0.5,
        fill: true,
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
    labels: eventArray.map(event => event.type),
    datasets: [
      {
        label: 'Meeting Sources',
        data: Object.values(eventArray.reduce((acc, event) => {
          acc[event.type] = (acc[event.type] || 0) + 1;
          return acc;
        }, {})),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Events',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Set the step size to 1
        },
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
          <div className="chart">
            <h4>Customer Growth</h4>
            <LineChart data={customerGrowthData} options={chartOptions} />
          </div>
          </div>
          <div className="overview-item">
            <h3>Events</h3>
            <span className="count">{eventArray.length}</span>
            <span className="percentage positive">+4.63%</span>
            <div className="chart">
            <h4>Event Stats</h4>
            <BarChart data={eventData} options={chartOptions} />
          </div>
          </div>
          <div className="overview-item">
            <h3>Doing Meetings</h3>
            <span className="count">28.49%</span>
            <span className="percentage negative">-12.37%</span>
            <div className="chart">
            <h4>Meeting Top Sources</h4>
            <PieChart data={pieData} options={pieChartOptions} />
          </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default Statistics;