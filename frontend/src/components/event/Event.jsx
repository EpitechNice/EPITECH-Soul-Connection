import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from "../layout/SideMenu";
import L from 'leaflet';
import { useGetEventsQuery } from '../../redux/api/eventApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';
import EventPopup from './EventPopupAdd';

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
  const { data, isLoading, error, isError, refetch } = useGetEventsQuery();
  const [selectedLocation, setSelectedLocation] = useState(center);
  const mapRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const usertype = useSelector((state) => state.auth);

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

  const eventsForCalendar = eventArray.map(event => ({
    title: event.name,
    start: event.date,
    extendedProps: {
      location_name: event.location_name,
      max_participants: event.max_participants,
      location_x: event.location_x,
      location_y: event.location_y,
    },
  }));

  const handleEventClick = (clickInfo) => {
    const { location_y, location_x } = clickInfo.event.extendedProps;
    if (location_y && location_x) {
      setSelectedLocation({ lat: location_x, lng: location_y });
    }
  };

  return (
    <div className="events-page pages">
      <div className="head-content-coaches-page">
        <div className="title-content-coaches">
          <h1 className="page-title">Events</h1>
        </div>
        <div className='group-button'>
          {usertype.user.type === "Manager" && (
            <button className="add-button" onClick={() => setShowPopup(true)}>
              +
            </button>
          )}
        </div>
      </div>

      {!showPopup && (
        <>
          <div className="calendar-section">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={eventsForCalendar}
              eventClick={handleEventClick}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay',
              }}
            />
          </div>

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
                  <Marker key={index} position={[event.location_x, event.location_y]}>
                    <Popup>
                      <b>{event.name}</b><br />
                      {event.location_name}<br />
                      Max participants: {event.max_participants}
                    </Popup>
                  </Marker>
                )
              ))}
              <MapUpdater />
            </MapContainer>
          </div>
        </>
      )}
      {showPopup && (
        <EventPopup 
          onClose={() => setShowPopup(false)} 
          refetch={refetch} 
        />
      )}
    </div>
  );
};

export default Events;
