import React, { useEffect, useState, useRef } from 'react';
import SideMenu from "../layout/SideMenu";
import BarChart from "./Bar";
import PieChart from "./Pie";
import LineChart from './Line';
import { useGetEventsQuery } from '../../redux/api/eventApi';
import { useGetCustomersQuery } from '../../redux/api/customerApi';
import {useGetEncountersQuery} from '../../redux/api/encounterApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

const Dashboard = () => {
  const { data, isLoading, error, isError } = useGetEventsQuery();
  const { data: encountersData } = useGetEncountersQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;
  
  const encountersArray = Array.isArray(encountersData) ? encountersData : encountersData?.encounters || [];
  const eventArray = Array.isArray(data) ? data : data?.events || [];
  // Count events per day
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const eventCountByDate = eventArray.reduce((acc, event) => {
    const eventDate = new Date(event.date.split('T')[0]);
    // Vérifie si la date de l'événement est dans les 30 derniers jours
    if (eventDate >= thirtyDaysAgo && eventDate <= today) {
      const dateString = eventDate.toISOString().split('T')[0];
      acc[dateString] = (acc[dateString] || 0) + 1;
    }
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#E74C3C', '#8E44AD', '#3498DB', '#2ECC71', '#1ABC9C', '#34495E',
          '#2980B9', '#27AE60', '#F39C12', '#1F618D', '#7F8C8D',
          '#FF5733', '#3498DB', '#2ECC71', '#1ABC9C', '#34495E', '#2980B9',
          '#27AE60', '#F39C12', '#1F618D', '#7F8C8D', '#FF5733', '#3498DB',
          '#2ECC71', '#1ABC9C', '#34495E', '#2980B9', '#27AE60', '#F39C12'],
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
      <div className="content-container">
        <div className="head-content-dashboard-page">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome!</p>
        </div>
      <div className="content">
        <div className="overview">
          <div className="overview-item">
            <h3>Customers</h3>
            <h4 className="sous-titre-graph">When customers have joined in the time.</h4>
            <span className="count">932</span>
            <span className="percentage positive">+12.37%</span>
          <div className="chart">
          <h4 className="sous-titre-graph">Our events their status.</h4>
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
            <BarChart data={eventData} options={chartOptions} />
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
      </div>
  );
};

export default Dashboard;