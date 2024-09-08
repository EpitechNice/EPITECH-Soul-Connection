import React from 'react';
import SideMenu from "../layout/SideMenu";

const Events = () => {
  const events = [
    { name: 'Speed dating', location: 'Café Michel', date: '22/04/2024', maxParticipants: 20 },
    { name: 'Speed dating', location: 'Café Michel', date: '22/04/2024', maxParticipants: 20 },
    { name: 'Speed dating', location: 'Café Michel', date: '22/04/2024', maxParticipants: 20 },
    { name: 'Speed dating', location: 'Café Michel', date: '22/04/2024', maxParticipants: 20 },
  ];

  return (
    <div className="events-page pages">
        <div className="col-12 col-lg-3">
            <SideMenu />
        </div>
      <h1>Events</h1>
      <hr />
      <div className="events-container">
        {/* Map section */}
        <div className="map-section">
          <img src="https://via.placeholder.com/400x300.png?text=Map+Placeholder" alt="Map" />
        </div>
        
        {/* Event List section */}
        <div className="events-list">
          {events.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-details">
                <h3>{event.name}</h3>
                <p>📍 {event.location}</p>
                <p>Max participants: {event.maxParticipants}</p>
              </div>
              <div className="event-date">
                <p>{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
