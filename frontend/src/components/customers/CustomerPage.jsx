import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importer useParams
import SideMenu from '../layout/SideMenu';
import { useGetCustomersQuery } from '../../redux/api/customerApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const CustomerPage = () => {
    const { id } = useParams(); // Récupérer l'ID du client depuis l'URL
    const { data, isLoading, error, isError } = useGetCustomersQuery();
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (data) {
            const user = data.customers.find(user => user.id === id);
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

    return (
        <div className="customers-container">
            <div className="side-menu">
                <SideMenu />
            </div>
            <div className="content-container">
                <h1>Customer Details</h1>

                {selectedUser ? (
                    <div className="customer-details">
                        <div className="customer-info">
                            <img src={selectedUser.image_path} alt="User" className="customer-image" />
                            <div className="info-section">
                                <h2>{selectedUser.name} {selectedUser.surname}</h2>
                                <p>User ID: {selectedUser.id}</p>
                                <p>Email: {selectedUser.email}</p>
                                <p>Address: {selectedUser.address}</p>
                                <p>Last Activity: {convertDate(selectedUser.lastActivity)}</p>
                                <p>Coach: {selectedUser.coach}</p>
                            </div>
                        </div>

                        <div className="recent-meetings">
                            <h3>Recent Meetings</h3>
                            <table className="meetings-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Rating</th>
                                        <th>Report</th>
                                        <th>Source</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.meetings.map(meeting => (
                                        <tr key={meeting.id}>
                                            <td>{convertDate(meeting.date)}</td>
                                            <td>{'★'.repeat(meeting.rating) + '☆'.repeat(5 - meeting.rating)}</td>
                                            <td>{meeting.report}</td>
                                            <td>{meeting.source}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="payment-history">
                            <h3>Payments History</h3>
                            <table className="payments-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.payments.map(payment => (
                                        <tr key={payment.id}>
                                            <td>{convertDate(payment.date)}</td>
                                            <td>{payment.paymentMethod}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
