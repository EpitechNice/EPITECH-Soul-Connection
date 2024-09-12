import React, { useState } from 'react';
import { useCreateTipMutation } from '../../redux/api/tipApi';

const TipPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        tip: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [createTip, { isLoading, isError, error }] = useCreateTipMutation();

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
            const { title, tip } = formData;
            await createTip({ title, tip }).unwrap();
            onClose();
        } catch (err) {
            console.error('Failed to create tip:', err);
        }
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    return (
        <div className="form-popup">
            <div className="form-content">
                <h2>Add New Tip</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Tip:
                        <textarea
                            name="tip"
                            value={formData.tip}
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
                    {isError && <p className="error">Failed to create tip: {error.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default TipPopup;
