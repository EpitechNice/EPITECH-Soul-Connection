    import React, { useState, useEffect } from 'react';
    import SideMenu from '../layout/SideMenu';
    import IconUser from '../../assets/User.svg';
    import IconCalendar from '../../assets/Calendar.svg';
    import IconLocalisation from '../../assets/Localisation.svg';

    const Customers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedFirstName, setSelectedFirstName] = useState('');

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=10')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.results);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);

    const handleSelectChange = (e) => {
        setSelectedFirstName(e.target.value);
        const user = users.find(user => user.name.first === e.target.value);
        setSelectedUser(user || null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatLocalisation = (location) => {
        return `${location.street.number} ${location.street.name} ${location.postcode} ${location.city}, ${location.country}`;
    };

    return (
        <div className="customers pages">
        <div className="col-12 col-lg-3">
            <SideMenu />
        </div>
        <h1>Customers</h1>
        <div className="separator"></div>

        <div className="selector-container">
            <select value={selectedFirstName} onChange={handleSelectChange}>
            <option value="" disabled>Select Customer</option>
            {users.map(user => (
                <option key={user.login.uuid} value={user.name.first}>
                {user.name.first} {user.name.last}
                </option>
            ))}
            </select>
        </div>

        {selectedUser && (
            <div className="user-card">
            <div className="user-info">
                <div className="info-item">
                <img src={IconUser} alt="User Icon" />
                <h3>{selectedUser.name.first} {selectedUser.name.last}</h3>
                </div>
                <div className="info-item">
                <img src={IconCalendar} alt="Calendar Icon" />
                <h3>{formatDate(selectedUser.dob.date)}</h3>
                </div>
                <div className="info-item">
                <img src={IconLocalisation} alt="Location Icon" />
                <h3>{formatLocalisation(selectedUser.location)}</h3>
                </div>
            </div>
            <img src={selectedUser.picture.large} alt="User Image" className="user-image" />
            </div>
        )}

        {selectedUser && (
            <>
            <div className="separator"></div>
            <div className="tables-container">
                <div className="ta">
                <h4>Payments</h4>
                <div className="user-table">
                    <div className="user-table-header">
                    <div className="user-table-header-cell">Date</div>
                    <div className="user-table-header-cell">Amount</div>
                    <div className="user-table-header-cell">Comment</div>
                    </div>
                    <div className="user-table-body">
                    <div className="user-table-row">
                        <div className="user-table-cell user-number">
                        <p>...</p>
                        </div>
                        <div className="user-table-cell">
                        <p>...€</p>
                        </div>
                        <div className="user-table-cell">
                        <p>...</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="tb">
                <h4>Meetings</h4>
                <div className="user-table">
                    <div className="user-table-header">
                    <div className="user-table-header-cell">Date</div>
                    <div className="user-table-header-cell">Rating</div>
                    <div className="user-table-header-cell">Report</div>
                    <div className="user-table-header-cell">Source</div>
                    </div>
                    <div className="user-table-body">
                    <div className="user-table-row">
                        <div className="user-table-cell user-number">
                        <p>...</p>
                        </div>
                        <div className="user-table-cell">
                        <p>./5</p>
                        </div>
                        <div className="user-table-cell">
                        <p>...</p>
                        </div>
                        <div className="user-table-cell">
                        <p>...</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </>
        )}
        </div>
    );
    };

    export default Customers;
