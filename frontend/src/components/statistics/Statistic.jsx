import React, { useEffect } from 'react';
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

  // Helper functions
  const getMonthYear = (date) => date.split('T')[0].slice(0, 7); // 'YYYY-MM'
  const getWeek = (date) => {
    const dt = new Date(date);
    const firstJan = new Date(dt.getFullYear(), 0, 1);
    const days = Math.floor((dt - firstJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((dt.getDay() + 1 + days) / 7);
  };

  // Group events by month
  const eventCountByMonth = eventArray.reduce((acc, event) => {
    const monthYear = getMonthYear(event.date);
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  // Group events by week
  const eventCountByWeek = eventArray.reduce((acc, event) => {
    const weekNumber = getWeek(event.date);
    const year = new Date(event.date).getFullYear();
    const key = `${year}-W${weekNumber}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Count total unique days and calculate daily average
  const uniqueDays = [...new Set(eventArray.map(event => event.date.split('T')[0]))];
  const dailyAverage = eventArray.length / uniqueDays.length;

  // Prepare data for charts
  const eventDataByMonth = {
    labels: Object.keys(eventCountByMonth),
    datasets: [
      {
        label: 'Number of Events per Month',
        data: Object.values(eventCountByMonth),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 0.5,
        fill: true,
      },
    ],
  };

  const eventDataByWeek = {
    labels: Object.keys(eventCountByWeek),
    datasets: [
      {
        label: 'Number of Events per Week',
        data: Object.values(eventCountByWeek),
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const dailyAverageData = {
    labels: ['Daily Average'],
    datasets: [
      {
        label: 'Average Events per Day',
        data: [dailyAverage],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 0.5,
        fill: true,
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

  return (
    <div className="statistics-page">
      <SideMenu />
      <div className="content">
        <div className="overview">
          <div className="overview-item">
            <h3>Events</h3>
            <h5>Monthly</h5>
            <BarChart data={eventDataByMonth} options={chartOptions} />
            <h5>Weekly</h5>
            <BarChart data={eventDataByWeek} options={chartOptions} />
            <h5>Daily Average</h5>
            <BarChart data={dailyAverageData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
