import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideMenu from '../layout/SideMenu';
import { useGetCustomerDetailsQuery } from '../../redux/api/customerApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const CustomerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook pour la navigation
    const { data, isLoading, error, isError } = useGetCustomerDetailsQuery(id);
    const [selectedUser, setSelectedUser] = useState(null);
    const customerImgData = "";

    useEffect(() => {
        if (data) {
            const user = data; // ou data.customers.find(user => user.id === parseInt(id, 10))
            setSelectedUser(user);
        }
        if (isError) {
            toast.error(error?.data?.message || "An error occurred.");
        }
    }, [data, isError, error, id]);

    const convertDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    if (isLoading) return <Loader />;

    const renderTableRows = (items, fields) => {
        if (!items || items.length === 0) {
            return (
                <div className="empty-message">No data available</div>
            );
        }
        return items.map(item => (
            <div className="table-row" key={item.id}>
                {fields.map(field => (
                    <div className="table-cell" key={field.key}>{field.format ? field.format(item[field.key]) : item[field.key]}</div>
                ))}
            </div>
        ));
    };

    return (
        <div className="customers-container">
            <div className="side-menu">
                <SideMenu />
            </div>
            <div className="content-container">
                <div className="head-content-coaches-page">
                    <h1 className="title">Customer Details</h1>
                    <button 
                        className="back-button"
                        onClick={() => navigate('/customers')}
                    >
                        <span className="back-icon">&#8592;</span> Back
                    </button>
                </div>

                {selectedUser ? (
                    <div className="customer-details">
                        <div className="profile-section">
                            <div className="customer-info">
                                {customerImgData ? (
                                    <img src={customerImgData} alt="User" className="customer-image" />
                                ) : (
                                    <div className="avatar-circle-profile">
                                        {selectedUser.name.charAt(0)}{selectedUser.surname?.charAt(0)}
                                    </div>
                                )}
                                <h2 className="user-name-profil">{selectedUser.name} {selectedUser.surname}</h2>
                                <hr className="separator" />
                                <div className="short-details">
                                    <strong>SHORT DETAILS</strong>
                                    <p>User ID: {selectedUser.id}</p>
                                    <p>Email: {selectedUser.email}</p>
                                    <p>Address: {selectedUser.address}</p>
                                    <p>Last Activity: {convertDate(selectedUser.createdAt)}</p>
                                    {selectedUser.modified_by ? (<p>Last Update: {convertDate(selectedUser.updatedAt)} by {selectedUser.modified_by}</p>
                                        ) : (
                                            <p>Last Update: never</p>
                                        )}
                                    <p>Coach: {selectedUser.coach}</p>
                                </div>
                            </div>
                        </div>
                        <div className="profil tables-section">
                            <div className="tables-wrapper">
                                <div className="user-table">
                                    <div className="table-header">Recent Meetings</div>
                                    <div className="user-table-header">
                                        <div className="user-table-header-cell">Date</div>
                                        <div className="user-table-header-cell">Rating</div>
                                        <div className="user-table-header-cell">Report</div>
                                        <div className="user-table-header-cell">Source</div>
                                    </div>
                                    <div className="user-table-body">
                                        {renderTableRows(selectedUser.meetings, [
                                            { key: 'date', format: convertDate },
                                            { key: 'rating', format: value => '★'.repeat(value) + '☆'.repeat(5 - value) },
                                            { key: 'report' },
                                            { key: 'source' }
                                        ])}
                                    </div>
                                </div>
                                <div className="user-table">
                                    <div className="table-header">Payments History</div>
                                    <div className="user-table-header">
                                        <div className="user-table-header-cell">Date</div>
                                        <div className="user-table-header-cell">Payment Method</div>
                                        <div className="user-table-header-cell">Amount</div>
                                        <div className="user-table-header-cell">Comment</div>
                                    </div>
                                    <div className="user-table-body">
                                        {renderTableRows(selectedUser.payments, [
                                            { key: 'date', format: convertDate },
                                            { key: 'paymentMethod' },
                                            { key: 'amount' },
                                            { key: 'comment' }
                                        ])}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No user found with ID {id}</p>
                )}
            </div>
        </div>
    );
};

export default CustomerPage;
