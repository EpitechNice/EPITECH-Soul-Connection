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
        console.log("Data:", data);
        console.log("Is Loading:", isLoading);
        console.log("Is Error:", isError);
        console.log("Error:", error);

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
        <div className="employees pages">
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <h1>Coaches</h1>
            <div className="separator"></div>

            <section id="employees" className="user-table">
                <div className="user-table-header">
                    <div className="user-table-header-cell">Number</div>
                    <div className="user-table-header-cell">Name</div>
                    <div className="user-table-header-cell">Email</div>
                    <div className="user-table-header-cell">Birth Date</div>
                    <div className="user-table-header-cell">Customers</div>
                    <div className="user-table-header-cell">Last Connection</div>
                </div>

                <div className="user-table-body">
                    {EmployeeArray.length === 0 ? (
                        <div className="user-table-row">
                            <div className="user-table-cell">No data available</div>
                        </div>
                    ) : (
                        EmployeeArray.map((user, index) => (
                            <div className="user-table-row" key={user.id}>
                                <div className="user-table-cell">{index + 1}</div>
                                <div className="user-table-cell">{user.name} {user.surname}</div>
                                <div className="user-table-cell">{user.email}</div>
                                <div className="user-table-cell">{formatDate(user.birth_date)}</div>
                                <div className="user-table-cell">
                                    <button className="coach_button" onClick={() => handleOpenModal(user)}>
                                        Edit List ...
                                    </button>
                                </div>
                                <div className="user-table-cell">{formatDate(user.updatedAt) || "N/A"}</div>
                            </div>
                        ))
                    )}
                </div>
            </section>

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
