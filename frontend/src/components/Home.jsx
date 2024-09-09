import React, { useEffect, useState } from 'react';
import SideMenu from "./layout/SideMenu"; // Import your side menu
import BarChart from './statistics/Bar';

const Home = () => {
  const [modules, setModules] = useState([]); // State to store API data

  // Fetch data from the API when the component is mounted
  useEffect(() => {
    fetch('/employees') // Replace with your actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setModules(data); // Store the fetched data in the state
      })
      .catch(error => {
        console.error("Error fetching employee data: ", error);
      });
  }, []);

  const eventData = { labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
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
    <div className="title pages">
      <h1>Soul Connection</h1>
      <h2>Dashboard</h2>
        <div className="col-12 col-lg-3">
            <SideMenu />
            </div>
      <div className="separator"></div>
      <div className="container">
      <section id="employees" className="user-table">
                    <div className="user-table-header">
                        <div className="user-table-header-cell">Number</div>
                        <div className="user-table-header-cell">Name</div>
                        <div className="user-table-header-cell">Email</div>
                        <div className="user-table-header-cell">Birth Date</div>
                        <div className="user-table-header-cell">Customers</div>
                        <div className="user-table-header-cell">Last connection</div>
                    </div>

                    <div className="user-table-body">
                            <div className="user-table-row">
                                <div className="user-table-cell"></div>
                                <div className="user-table-cell"></div>
                                <div className="user-table-cell"></div>
                                <div className="user-table-cell"></div>
                                <div className="user-table-cell">
                                    <button className="coach_button">
                                        Edit List ...
                                    </button>
                                </div>
                                <div className="user-table-cell">...</div>
                            </div>
                    </div>
                </section>
            </div>
    </div>
  );
};

export default Home;
