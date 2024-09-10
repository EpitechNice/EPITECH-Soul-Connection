import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from "../layout/SideMenu";
import L from 'leaflet';
import { useGetEventsQuery } from '../../redux/api/eventApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

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

const formatDateTime = (dateTimeString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
};

const Events = () => {
  const { data, isLoading, error, isError } = useGetEventsQuery();
  const [selectedLocation, setSelectedLocation] = useState(center);
  const mapRef = useRef(null);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  const eventArray = Array.isArray(data) ? data : data?.events || [];

  const handleCardClick = (location) => {
    setSelectedLocation(location);
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(selectedLocation, map.getZoom());
    }, [selectedLocation, map]);

    return null;
  };

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
            whenCreated={mapInstance => { mapRef.current = mapInstance; }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {eventArray.map((event, index) => (
              event.location_y && event.location_x && (
                <Marker key={index} position={[event.location_y, event.location_x]}>
                  <Popup>
                    <b>{event.name}</b><br />
                    {event.location}<br />
                    Max participants: {event.max_participants}
                  </Popup>
                </Marker>
              )
            ))}
            <MapUpdater />
          </MapContainer>
        </div>

        <div className="events-list">
          {eventArray.map((event, index) => (
            <div 
              className="event-card" 
              key={index}
              onClick={() => handleCardClick({ lat: event.location_y, lng: event.location_x })}
              style={{ cursor: 'pointer' }}
            >
              <div className="event-details">
                <h3>{event.name}</h3>
                <p>📍 {event.location_name}</p>
                <p>Max participants: {event.max_participants}</p>
              </div>
              <div className="event-date">
                <p>{formatDateTime(event.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;