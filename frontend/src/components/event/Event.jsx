import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from "../layout/SideMenu";
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 48.8589466,
  lng: 2.2769956,
};

const Events = () => {
  const events = [
    { name: 'Speed dating', location: 'Café Michel', lat: 48.8566, lng: 2.3522, date: '22/04/2024', maxParticipants: 20 },
    { name: 'Speed networking', location: 'Café des Amis', lat: 48.864716, lng: 2.349014, date: '23/04/2024', maxParticipants: 15 },
    { name: 'Business meetup', location: 'Café de Flore', lat: 48.8588443, lng: 2.2943506, date: '24/04/2024', maxParticipants: 30 },
    { name: 'Startup Pitch', location: 'Café des Arts', lat: 48.853, lng: 2.3499, date: '25/04/2024', maxParticipants: 25 },
  ];

  return (
    <div className="events-page pages">
      <div className="col-12 col-lg-3">
        <SideMenu />
      </div>
      <h1>Events</h1>
      <div className="separator"></div>
      <div className="events-container">
        <div className="map-section">
          <MapContainer 
            style={mapContainerStyle} 
            center={center} 
            zoom={12} 
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {events.map((event, index) => (
              <Marker key={index} position={[event.lat, event.lng]}>
                <Popup>
                  <b>{event.name}</b><br />
                  {event.location}<br />
                  Max participants: {event.maxParticipants}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

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
