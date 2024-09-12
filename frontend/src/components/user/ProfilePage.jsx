import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideMenu from '../layout/SideMenu';
import { useGetEmployeeProfileQuery } from '../../redux/api/userApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error, isError } = useGetEmployeeProfileQuery(id);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (data) {
            const user = data;
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

                <div className="head-content-profile-page">
                    <h1 className="page-title">Profile Details</h1>
                    <button
                        className="back-button"
                        onClick={() => navigate('/dashboard')}
                    >
                        <span className="back-icon">&#8592;</span> Back
                    </button>
                </div>

                {selectedUser ? (
                    <div className="me-details">
                        <div className="profile-section">
                            <div className="customer-info">
                                {/* {selectedUser.image_path ? (
                                    <img src={selectedUser.image_path} alt="User" className="customer-image" />
                                ) : ( */}
                                    <div className="avatar-circle-profile">
                                        {selectedUser.name.charAt(0)}{selectedUser.surname?.charAt(0)}
                                    </div>
                                {/* )} */}
                                <h2 className="user-name-profil">{selectedUser.name} {selectedUser.surname}</h2>
                                <hr className="separator" />
                                <div className="short-details">
                                    <strong>SHORT DETAILS</strong>
                                    <p><strong>User ID:</strong> {selectedUser.id}</p>
                                    <p><strong>Gender:</strong> {selectedUser.gender}</p>
                                    <p><strong>Email:</strong> {selectedUser.email}</p>
                                    <p><strong>Role:</strong> {selectedUser.type}</p>
                                    <p><strong>Work:</strong> {selectedUser.work}</p>
                                    <p><strong>Birth date:</strong> {convertDate(selectedUser.birth_date)}</p>
                                    <p><strong>Address:</strong> {selectedUser.address}</p>
                                    <p><strong>Created:</strong> {convertDate(selectedUser.createdAt)}</p>
                                    <p><strong>Last Update:</strong> {convertDate(selectedUser.updatedAt)}</p>
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

export default ProfilePage;
