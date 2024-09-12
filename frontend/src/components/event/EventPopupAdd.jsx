import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useCreateEventMutation } from '../../redux/api/eventApi';

const EventPopup = ({ onClose, refetch }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        max_participants: '',
        location_x: '',
        location_y: '',
        type: '',
        location_name: '',
        employee_id: '1',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            await createEvent(formData).unwrap();
            refetch();
            onClose();
        } catch (err) {
            console.error('Failed to create event:', err);
        }
    };

    const isFormValid = () => {
        // Convert all values to strings before trimming
        return Object.values(formData).every(value => String(value).trim() !== '');
    };

    const MapClickHandler = () => {
        const map = useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng;
                setFormData({
                    ...formData,
                    location_x: lat,
                    location_y: lng,
                });
            },
        });

        return null;
    };

    return (
        <div className="form-popup">
            <div className="form-content">
                <h2>Add New Event</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Max Participants:
                        <input
                            type="number"
                            name="max_participants"
                            value={formData.max_participants}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Location Name:
                        <input
                            type="text"
                            name="location_name"
                            value={formData.location_name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Type:
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Coordinates (optional):
                        <input
                            type="text"
                            name="location_x"
                            value={formData.location_x}
                            onChange={handleChange}
                            placeholder="Latitude"
                        />
                        <input
                            type="text"
                            name="location_y"
                            value={formData.location_y}
                            onChange={handleChange}
                            placeholder="Longitude"
                        />
                    </label>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {isError && <p className="error">Failed to create event: {error.message}</p>}
                </form>
                <MapContainer
                    style={{ height: '200px', width: '100%' }}
                    center={[48.8589466, 2.2769956]}
                    zoom={12}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler />
                    {formData.location_x && formData.location_y && (
                        <Marker position={[parseFloat(formData.location_x), parseFloat(formData.location_y)]} />
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default EventPopup;
