import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";

const Employees = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userClients, setUserClients] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=10')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.results);
                setIsLoading(false);
                setUserClients(data.results.reduce((acc, user) => {
                    return acc;
                }, {}));
            })
            .catch((error) => {
                console.error('Error retrieving data:', error);
                setIsLoading(false);
            });
    }, []);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClientSelection = (clientId) => {
        setUserClients(prevState => {
            const userId = selectedUser.login.uuid;
            const currentUserClients = prevState[userId] || [];

            const updatedClients = currentUserClients.includes(clientId)
                ? currentUserClients.filter(id => id !== clientId)
                : [...currentUserClients, clientId];

            return { ...prevState, [userId]: updatedClients };
        });
    };

    return (
        <div className="employees pages">
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <h1>Coaches</h1>
            <div className="separator"></div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <section id="employees" className="user-table">
                    <div className="user-table-header">
                        <div className="user-table-header-cell">Number</div>
                        <div className="user-table-header-cell">Name</div>
                        <div className="user-table-header-cell">Email</div>
                        <div className="user-table-header-cell">Birth Date</div>
                        <div className="user-table-header-cell">Customers</div>
                        <div className="user-table-header-cell">Last connection</div>
                    </div>

                    <div className="user-table-body">
                        {users.map((user, index) => (
                            <div className="user-table-row" key={user.login.uuid}>
                                <div className="user-table-cell">{index + 1}</div>
                                <div className="user-table-cell">{user.name.first} {user.name.last}</div>
                                <div className="user-table-cell">{user.email}</div>
                                <div className="user-table-cell">{formatDate(user.dob.date)}</div>
                                <div className="user-table-cell">
                                    <button className="coach_button" onClick={() => handleOpenModal(user)}>
                                        Edit List ...
                                    </button>
                                </div>
                                <div className="user-table-cell">...</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {showModal && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Select Clients for {selectedUser?.name.first} {selectedUser?.name.last}</h3>
                        <div className="client-list">
                            {users.map(user => (
                                <div key={user.login.uuid}>
                                    <input
                                        type="checkbox"
                                        id={`client-${user.login.uuid}`}
                                        checked={(userClients[selectedUser.login.uuid] || []).includes(user.login.uuid)}
                                        onChange={() => handleClientSelection(user.login.uuid)}
                                    />
                                    <label htmlFor={`client-${user.login.uuid}`}>{user.name.first} {user.name.last}</label>
                                </div>
                            ))}
                        </div>
                        <button className="coach_button" onClick={handleCloseModal}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
