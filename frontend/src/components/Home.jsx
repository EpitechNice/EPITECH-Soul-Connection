import React, { useEffect } from 'react';
import SideMenu from './layout/SideMenu';
import { useGetEventsQuery } from '../redux/api/eventApi';
import BarChart from './statistics/Bar';
import toast from 'react-hot-toast';
import Loader from './layout/Loader';

const Home = () => {

  const { data, isLoading, error, isError } = useGetEventsQuery();

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

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  const eventArray = Array.isArray(data) ? data : data?.events || [];
  

    return (
        <div className="title pages">
            <h1>Soul Connection</h1>
            <h2>Dashboard</h2>
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <div className="separator"></div>
            <div className="row-stats">
            <BarChart data={eventData} options={chartOptions} />
            <BarChart data={coachClients} options={chartOptions} />
            </div>
            <div className="employees pages">
                <section id="employees" className="user-table">
                    <div className="user-table-header">
                        <div className="user-table-header-cell">#</div>
                        <div className="user-table-header-cell">Event</div>
                        <div className="user-table-header-cell">Localisation</div>
                        <div className="user-table-header-cell">Period</div>
                        <div className="user-table-header-cell">Participants</div>
                        <div className="user-table-header-cell">Type</div>
                    </div>
                    <div className="user-table-body">
                        {eventArray.map((event, index) => (
                            <div className="user-table-row" key={index}>
                                <div className="user-table-cell">{index + 1}</div>
                                <div className="user-table-cell">{event.name}</div>
                                <div className="user-table-cell">{event.location_name}</div>
                                <div className="user-table-cell">{event.period}</div>
                                <div className="user-table-cell">{event.participants}</div>
                                <div className="user-table-cell">{event.type}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;