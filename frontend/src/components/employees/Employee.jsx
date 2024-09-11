import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetEmployeesQuery } from '../../redux/api/employeeApi';
import toast from "react-hot-toast";
import Loader from '../layout/Loader';

const Employees = () => {
    const { data, isLoading, error, isError } = useGetEmployeesQuery();
    const [users, setUsers] = useState([]);
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
        if (data) {
            setUsers(data.coach || []);
        }
        if (isError) {
            toast.error(error?.data?.message || "An error occurred.");
        }
    }, [data, isError, error, isLoading]);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClientSelection = (clientId) => {
        setUserClients(prevState => {
            const userId = selectedUser.id;
            const currentUserClients = prevState[userId] || [];

            const updatedClients = currentUserClients.includes(clientId)
                ? currentUserClients.filter(id => id !== clientId)
                : [...currentUserClients, clientId];

            return { ...prevState, [userId]: updatedClients };
        });
    };

    if (isLoading) return <Loader />;
    const EmployeeArray = Array.isArray(users) ? users : [];

    return (
        <div className="employees-page">
            <div className="side-menu">
                <SideMenu />
            </div>
            <div className="main-content">
                <h1 className="page-title">Coaches List</h1>
                <p className="page-subtitle">You have total {users.length} coaches.</p>
                <div className="actions">
                    <button className="bulk-action-button">Bulk Action</button>
                    <button className="export-button">Export</button>
                </div>
                <div className="user-table">
                    <div className="user-table-header">
                        <div className="user-table-header-cell">Coach</div>
                        <div className="user-table-header-cell">Email</div>
                        <div className="user-table-header-cell">Phone</div>
                        <div className="user-table-header-cell">Number of customers</div>
                    </div>
                    <div className="user-table-body">
                        {EmployeeArray.length === 0 ? (
                            <div className="user-table-row">
                                <div className="user-table-cell">No data available</div>
                            </div>
                        ) : (
                            EmployeeArray.map((user, index) => (
                                <div className="user-table-row" key={user.id}>
                                    <div className="user-table-cell">
                                        <div className="avatar-circle">
                                            {user.name.charAt(0)}{user.surname?.charAt(0)}
                                        </div>
                                        <div className="user-info">
                                            <p className="user-name">{user.name} {user.surname}</p>
                                        </div>
                                    </div>
                                    <div className="user-table-cell">{user.email}</div>
                                    <div className="user-table-cell">{user.phone}</div>
                                    <div className="user-table-cell">{user.customers?.length || "N/A"}</div>
                                    <div className="user-table-cell">
                                        <button className="edit-button" onClick={() => handleOpenModal(user)}>
                                            ...
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {showModal && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Select Clients for {selectedUser?.name} {selectedUser?.surname}</h3>
                        <div className="client-list">
                            {users.map(user => (
                                <div key={user.id}>
                                    <input
                                        type="checkbox"
                                        id={`client-${user.id}`}
                                        checked={(userClients[selectedUser.id] || []).includes(user.id)}
                                        onChange={() => handleClientSelection(user.id)}
                                    />
                                    <label htmlFor={`client-${user.id}`}>{user.name} {user.surname}</label>
                                </div>
                            ))}
                        </div>
                        <button className="save-button" onClick={handleCloseModal}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
