import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideMenu from '../layout/SideMenu';
import { useGetCustomerDetailsQuery } from '../../redux/api/customerApi';
import { useGetPaymentsByCustomerQuery } from '../../redux/api/paymentApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";
import { ReactComponent as SaveIcon } from '../../assets/Save.svg';
import { ReactComponent as MsgIcon } from '../../assets/Msg.svg';

const CustomerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: customerData, isLoading: isCustomerLoading, error: customerError, isError: isCustomerError } = useGetCustomerDetailsQuery(id);
    const { data: paymentsData, isLoading: isPaymentsLoading, error: paymentsError, isError: isPaymentsError } = useGetPaymentsByCustomerQuery(id);
    const [selectedUser, setSelectedUser] = useState(null);
    const customerImgData = "";

    useEffect(() => {
        if (customerData) {
            setSelectedUser(customerData);
        }
        if (isCustomerError) {
            toast.error(customerError?.data?.message || "An error occurred.");
        }
    }, [customerData, isCustomerError, customerError]);

    const convertDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    if (isCustomerLoading || isPaymentsLoading) return <Loader />;

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
                                <div className="profile-header">
                                    <div className="customer-image-container">
                                        {customerImgData ? (
                                            <img src={customerImgData} alt="User" className="customer-image" />
                                        ) : (
                                            <div className="avatar-circle-profile">
                                                {selectedUser.name.charAt(0)}{selectedUser.surname?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h2 className="user-name-profil">{selectedUser.name} {selectedUser.surname}</h2>
                                <hr className="separator" />
                                <div className="profile-buttons">
                                        <button className="profile-button">
                                            <SaveIcon />
                                        </button>
                                        <button className="profile-button">
                                            <MsgIcon />
                                        </button>
                                    </div>
                                <hr className="separator" />
                                <div className="short-details">
                                    <strong>SHORT DETAILS</strong>
                                    <p>User ID: {selectedUser.id}</p>
                                    <p>Email:</p>
                                    <p>{selectedUser.email}</p>
                                    <p>Address:</p>
                                    <p>{selectedUser.address}</p>
                                    <p>Last Activity: {convertDate(selectedUser.createdAt)}</p>
                                    <p>Last Update: {convertDate(selectedUser.updatedAt)}</p>
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
                                        {renderTableRows(paymentsData || [], [
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
