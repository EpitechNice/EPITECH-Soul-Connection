import React, { useEffect, useState } from 'react';
import SideMenu from "./layout/SideMenu"; // Import your side menu
import IconUser from '../assets/User.svg';
import IconBriefcase from '../assets/Briefcase.svg';

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

  return (
    <div className="pages">
      <h1>Soul Connection</h1>
      <h2>Home</h2>
        <div className="col-12 col-lg-3">
            <SideMenu />
            </div>
      <div className="separator"></div>
      <div className="container">
        <div className="rowmain">
          <div className="card" id="cardclient">
            <img src={IconUser} alt="User Icon" />
            {modules.map((employee) => (
              <p key={employee.id}>{employee.name}</p>
            ))}
            <p>Total Users</p>
          </div>
          <div className="card" id="cardcoach">
            <img src={IconUser} alt="Coach Icon" />
            <p>2500</p>
            <p>Total coaches</p>
          </div>
          <div className="card" id="cardrdv">
            <img src={IconBriefcase} alt="Rendez-vous Icon" />
            <p>2500</p>
            <p>Total Rendez-vous</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
