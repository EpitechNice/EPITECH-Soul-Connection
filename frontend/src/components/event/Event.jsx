import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from "../layout/SideMenu";
import L from 'leaflet';
import { useGetEventsQuery } from '../../redux/api/eventApi';
import toast from 'react-hot-toast';

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
    const { data, isLoading, error, isError } = useGetEventsQuery();

    useEffect(() => {
      if (isError) {
          toast.error(error?.data?.message);
      }
  }, [isError, error]);

  
  if (isLoading) return <Loader />;

  const eventArray = Array.isArray(data) ? data : data?.events;

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
          {eventArray?.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-details">
                <h3>{event.name}</h3>
                <p>{event.location_name}</p>
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