import React, { useState } from 'react';
import { useCreateCustomerMutation } from '../../redux/api/customerApi';

const FormPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        birth_date: '',
        gender: '',
        description: '',
        astrological_sign: '',
        phone_number: '',
        address: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [createCustomer, { isLoading, isError, error }] = useCreateCustomerMutation();

    const astrologicalSigns = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra',
        'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];

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
            const { email, name, surname, birth_date, gender, description, astrological_sign, phone_number, address } = formData;
            const newCustomer = {
                email,
                name,
                surname,
                birth_date,
                gender,
                description,
                astrological_sign,
                phone_number,
                address,
            };

            await createCustomer(newCustomer).unwrap();
            onClose();
        } catch (err) {
            console.error('Failed to create customer:', err);
        }
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    return (
        <div className="form-popup">
            <div className="form-content">
                <h2>Add New Customer</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Surname:
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Birth Date:
                        <input
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Gender:
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </label>
                    <label>Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Astrological Sign:
                        <select
                            name="astrological_sign"
                            value={formData.astrological_sign}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            {astrologicalSigns.map((sign) => (
                                <option key={sign} value={sign}>{sign}</option>
                            ))}
                        </select>
                    </label>
                    <label>Phone Number:
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {isError && <p className="error">Failed to create customer: {error.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default FormPopup;
