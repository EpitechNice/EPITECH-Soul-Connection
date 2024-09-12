import React, { useEffect, useState, useRef } from 'react';
import SideMenu from "../layout/SideMenu";
import BarChart from "./Bar";
import PieChart from "./Pie";
import LineChart from './Line';
import { useGetEventsQuery } from '../../redux/api/eventApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

const Dashboard = () => {
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

  // Count events by type
  const eventCountByType = eventArray.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(eventCountByType),
    datasets: [
      {
        label: 'Event Types',
        data: Object.values(eventCountByType),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
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
        ticks: {
          maxRotation: 90,
          minRotation: 45,
          autoSkip: false, // Show all labels
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
            <h4>Our events and their status.</h4>
            <div className="data-graph-event">
              <div className="block-graph-event">
            <h5>Monthly</h5>
            <span className="count">{eventArray.length}</span>
            <span className="percentage positive">+4.63%</span>
            </div>
            <div className="block-graph-event">
            <h5>Weekly</h5>
            <span className="count">{eventArray.length}</span>
            <span className="percentage positive">+4.63%</span>
            </div>
            <div className="block-graph-event">
            <h5>Daily</h5>
            <span className="count">{eventArray.length}</span>
            <span className="percentage positive">+4.63%</span>
            </div>
            </div>
            <div className="chart">
            <BarChart data={eventData} options={chartOptions} />
          </div>
          </div>
          <div className="overview-item">
            <h3>Meeting top sources</h3>
            <div className="chart">
            <PieChart data={pieData} options={pieChartOptions} />
          </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default Dashboard;