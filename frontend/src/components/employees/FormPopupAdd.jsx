import React, { useState } from 'react';
import { useCreateEmployeeMutation } from '../../redux/api/employeeApi';

const FormPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        type: 'Coach',
        name: '',
        surname: '',
        birth_date: '',
        gender: '',
        work: '',
    });

    const [createEmployee, { isLoading, isError, error }] = useCreateEmployeeMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password, type, name, surname, birth_date, gender, work } = formData;
            const newEmployee = {
                email,
                password,
                type,
                name,
                surname,
                birth_date,
                gender,
                work,
            };

            await createEmployee(newEmployee).unwrap();
            onClose();
        } catch (err) {
            console.error('Failed to create employee:', err);
        }
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    return (
        <div className="form-popup">
            <div className="form-content">
                <h2>Add New Employee</h2>
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
                    <label>Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
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
                    <label>Work:
                        <input
                            type="text"
                            name="work"
                            value={formData.work}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit" disabled={!isFormValid() || isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    {isError && <p className="error">Failed to create employee: {error.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default FormPopup;
