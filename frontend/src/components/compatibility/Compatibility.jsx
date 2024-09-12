import React, { useState, useEffect } from 'react';
import SideMenu from '../layout/SideMenu';
import { useGetCustomersQuery } from '../../redux/api/customerApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const Compatibility = () => {
    const { data, isLoading, error, isError } = useGetCustomersQuery();
    const [customers, setCustomers] = useState([]);
    const [selectedClient1, setSelectedClient1] = useState('');
    const [selectedClient2, setSelectedClient2] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (data) {
            setCustomers(data.customers || []);
        }
        if (isError) {
            toast.error(error?.data?.message || "An error occurred.");
        }
    }, [data, isError, error, isLoading]);

    const handleClientChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const calculateCompatibility = () => {
        if (selectedClient1 && selectedClient2) {
            const client1 = customers.find(client => client.email === selectedClient1);
            const client2 = customers.find(client => client.email === selectedClient2);

            if (client1 && client2) {
                const result = getCompatibility(client1.astrological_sign, client2.astrological_sign);
                setResult(result);
            } else {
                setResult(null);
            }
        } else {
            setResult(null);
        }
    };

    const getCompatibility = (sign1, sign2) => {
        const compatibility = {
            'Aries': { 'Aries': 50, 'Taurus': 60, 'Gemini': 70, 'Cancer': 40, 'Leo': 80, 'Virgo': 50, 'Libra': 70, 'Scorpio': 60, 'Sagittarius': 90, 'Capricorn': 60, 'Aquarius': 80, 'Pisces': 50 },
            'Taurus': { 'Aries': 60, 'Taurus': 50, 'Gemini': 40, 'Cancer': 80, 'Leo': 60, 'Virgo': 90, 'Libra': 50, 'Scorpio': 70, 'Sagittarius': 60, 'Capricorn': 80, 'Aquarius': 50, 'Pisces': 90 },
            'Gemini': { 'Aries': 70, 'Taurus': 40, 'Gemini': 50, 'Cancer': 60, 'Leo': 70, 'Virgo': 60, 'Libra': 80, 'Scorpio': 50, 'Sagittarius': 80, 'Capricorn': 50, 'Aquarius': 90, 'Pisces': 60 },
            'Cancer': { 'Aries': 40, 'Taurus': 80, 'Gemini': 60, 'Cancer': 50, 'Leo': 70, 'Virgo': 80, 'Libra': 60, 'Scorpio': 90, 'Sagittarius': 50, 'Capricorn': 70, 'Aquarius': 50, 'Pisces': 80 },
            'Leo': { 'Aries': 80, 'Taurus': 60, 'Gemini': 70, 'Cancer': 70, 'Leo': 50, 'Virgo': 60, 'Libra': 80, 'Scorpio': 60, 'Sagittarius': 90, 'Capricorn': 60, 'Aquarius': 70, 'Pisces': 50 },
            'Virgo': { 'Aries': 50, 'Taurus': 90, 'Gemini': 60, 'Cancer': 80, 'Leo': 60, 'Virgo': 50, 'Libra': 70, 'Scorpio': 80, 'Sagittarius': 60, 'Capricorn': 90, 'Aquarius': 50, 'Pisces': 70 },
            'Libra': { 'Aries': 70, 'Taurus': 50, 'Gemini': 80, 'Cancer': 60, 'Leo': 80, 'Virgo': 70, 'Libra': 50, 'Scorpio': 60, 'Sagittarius': 90, 'Capricorn': 70, 'Aquarius': 80, 'Pisces': 60 },
            'Scorpio': { 'Aries': 60, 'Taurus': 70, 'Gemini': 50, 'Cancer': 90, 'Leo': 60, 'Virgo': 80, 'Libra': 60, 'Scorpio': 50, 'Sagittarius': 70, 'Capricorn': 80, 'Aquarius': 50, 'Pisces': 90 },
            'Sagittarius': { 'Aries': 90, 'Taurus': 60, 'Gemini': 80, 'Cancer': 50, 'Leo': 90, 'Virgo': 60, 'Libra': 90, 'Scorpio': 70, 'Sagittarius': 50, 'Capricorn': 70, 'Aquarius': 90, 'Pisces': 60 },
            'Capricorn': { 'Aries': 60, 'Taurus': 80, 'Gemini': 50, 'Cancer': 70, 'Leo': 60, 'Virgo': 90, 'Libra': 70, 'Scorpio': 80, 'Sagittarius': 70, 'Capricorn': 50, 'Aquarius': 60, 'Pisces': 80 },
            'Aquarius': { 'Aries': 80, 'Taurus': 50, 'Gemini': 90, 'Cancer': 50, 'Leo': 70, 'Virgo': 50, 'Libra': 80, 'Scorpio': 50, 'Sagittarius': 90, 'Capricorn': 60, 'Aquarius': 50, 'Pisces': 70 },
            'Pisces': { 'Aries': 50, 'Taurus': 90, 'Gemini': 60, 'Cancer': 80, 'Leo': 50, 'Virgo': 70, 'Libra': 60, 'Scorpio': 90, 'Sagittarius': 60, 'Capricorn': 80, 'Aquarius': 70, 'Pisces': 50 },
        };

        if (compatibility[sign1] && compatibility[sign1][sign2] !== undefined) {
            const baseCompatibility = compatibility[sign1][sign2];
            const variation = Math.floor(Math.random() * 11) - 5;
            const result = Math.max(0, Math.min(100, baseCompatibility + variation));
            return result;
        } else {
            return "Compatibility unknown.";
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="compatibility pages">
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <h1 className='page-title'>Client Compatibility</h1>
            <div className="selector-container">
                <div>
                    <label htmlFor="client1">Select Client 1:</label>
                    <select value={selectedClient1} onChange={handleClientChange(setSelectedClient1)} id="client1">
                        <option value="">Select a client</option>
                        {customers.map(client => (
                            <option key={client.email} value={client.email}>{client.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="client2">Select Client 2:</label>
                    <select value={selectedClient2} onChange={handleClientChange(setSelectedClient2)} id="client2">
                        <option value="">Select a client</option>
                        {customers.map(client => (
                            <option key={client.email} value={client.email}>{client.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button 
                        className="button_comp" 
                        onClick={calculateCompatibility} 
                        disabled={!selectedClient1 || !selectedClient2}
                    >
                        Calculate Compatibility
                    </button>
                </div>
            </div>

            {result !== null && (
                <div>
                    <h2>Result: {result}%</h2>
                </div>
            )}
        </div>
    );
};

export default Compatibility;
