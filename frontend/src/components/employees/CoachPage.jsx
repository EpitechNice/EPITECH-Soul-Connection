import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideMenu from '../layout/SideMenu';
import { useGetEmployeeDetailsQuery } from '../../redux/api/employeeApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const CoachPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error, isError } = useGetEmployeeDetailsQuery(id);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (data) {
            setSelectedUser(data);
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

                <div className="head-content-profile-page">
                    <h1 className="page-title">Coach Details</h1>
                    <button
                        className="back-button"
                        onClick={() => navigate('/employees')}
                    >
                        <span className="back-icon">&#8592;</span> Back
                    </button>
                </div>

                {selectedUser ? (
                    <div className="me-details">
                        <div className="profile-section">
                            <div className="customer-info">
                                {selectedUser.image_path ? (
                                    <img src={selectedUser.image_path} alt="User" className="customer-image" />
                                ) : (
                                    <div className="avatar-circle-profile">
                                        {selectedUser.name?.charAt(0)}{selectedUser.surname?.charAt(0)}
                                    </div>
                                )}
                                <h2 className="user-name-profil">
                                    {selectedUser.name || "N/A"} {selectedUser.surname || ""}
                                </h2>
                                <hr className="separator" />
                                <div className="short-details">
                                    <strong>SHORT DETAILS</strong>
                                    <p><strong>User ID:</strong> {selectedUser.id || "N/A"}</p>
                                    <p><strong>Gender:</strong> {selectedUser.gender || "N/A"}</p>
                                    <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>
                                    <p><strong>Role:</strong> {selectedUser.type || "N/A"}</p>
                                    <p><strong>Work:</strong> {selectedUser.work || "N/A"}</p>
                                    <p><strong>Birth date:</strong> {selectedUser.birth_date ? convertDate(selectedUser.birth_date) : "N/A"}</p>
                                    <p><strong>Address:</strong> {selectedUser.address || "N/A"}</p>
                                    <p><strong>Created:</strong> {selectedUser.createdAt ? convertDate(selectedUser.createdAt) : "N/A"}</p>
                                    <p><strong>Last Update:</strong> {selectedUser.updatedAt ? convertDate(selectedUser.updatedAt) : "N/A"}</p>
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

export default CoachPage;
