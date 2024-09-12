import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetCustomersQuery, useDeleteCustomerMutation, useUpdateCustomerMutation } from '../../redux/api/customerApi';
import toast from "react-hot-toast";
import Loader from '../layout/Loader';
import IconDownload from '../../assets/Download.svg';
import SortIcon from '../../assets/Sort.svg';
import SettingsIcon from '../../assets/Settings.svg';
import { useSelector } from 'react-redux';
import FormPopup from './CustomerFormPopupAdd';

const Customers = () => {
    const { data, isLoading, error, isError, refetch } = useGetCustomersQuery();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('default');
    const [showPopup, setShowPopup] = useState(false);
    const [editMenuOpen, setEditMenuOpen] = useState(null);
    const [deleteCustomer] = useDeleteCustomerMutation();
    const { mutate: updateCustomer } = useUpdateCustomerMutation();
    const usertype = useSelector((state) => state.auth);
    const customerImgData = "";

    useEffect(() => {
        if (data) {
            setUsers(data.customers || []);
        }
        if (isError) {
            toast.error(error?.data?.message || "An error occurred.");
        }
    }, [data, isError, error, isLoading]);

    useEffect(() => {
        handleSortChange(sortOrder);
    }, [sortOrder]);

    const handleSortChange = (order) => {
        let sortedUsers = [...users];
        if (order === 'asc') {
            sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === 'desc') {
            sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
        }
        setUsers(sortedUsers);
    };

    const handleMenuClick = (id) => {
        if (editMenuOpen === id) {
            setEditMenuOpen(null);
        } else {
            setEditMenuOpen(id);
        }
    };

    const handleEditClick = async (id) => {
        const user = users.find(user => user.id === id);
        try {
            await updateCustomer(user).unwrap();
            refetch();
            toast.success("Customer updated successfully.");
        } catch (err) {
            console.error('Failed to update customer:', err);
            toast.error("Failed to update customer.");
        }
    };

    const handleDeleteClick = async (userId) => {
        try {
            await deleteCustomer(userId).unwrap();
            refetch();
            toast.success("Customer deleted successfully.");
        } catch (err) {
            console.error('Failed to delete customer:', err);
            toast.error("Failed to delete customer.");
        }
    };

    const downloadCSV = () => {
        const csvRows = [];
        csvRows.push(['Name', 'Email', 'Phone', 'Address', 'Birth Date', 'Gender', 'Astrological Sign'].join(','));

        users.forEach(user => {
            const row = [
                `${user.name} ${user.surname}`,
                user.email,
                user.phone_number || 'N/A',
                user.address || 'N/A',
                user.birth_date || 'N/A',
                user.gender || 'N/A',
                user.astrological_sign || 'N/A'
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customers_list.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleBulkAction = () => {
        const selectedAction = document.querySelector('.bulk-action-select').value;
        if (selectedAction === 'delete') {
            // Handle bulk delete
        } else if (selectedAction === 'email') {
            // Send email to selected users
        }
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.name} ${user.surname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    if (isLoading) return <Loader />;
    const CustomerArray = Array.isArray(filteredUsers) ? filteredUsers : [];

    return (
        <div className="customers-page">
            <div className="side-menu">
                <SideMenu />
            </div>
            <div className="main-content">
                <div className="head-content-coaches-page">
                    <div className="title-content-coaches">
                        <h1 className="page-title">Customers List</h1>
                        <p className="page-subtitle">You have total {users.length} customers.</p>
                    </div>
                    <div className='group-button'>
                        <button className="export-button" onClick={downloadCSV}>
                            <img src={IconDownload} alt="Download Icon" />
                            Export
                        </button>
                        {usertype.user.type === "Manager" ? (
                            <button className="add-button" onClick={() => setShowPopup(true)}>
                                +
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="all-content-table">
                    <div className="actions">
                        <div className="user-table-header-cell bulk-action-dropdown button-left-group">
                            <select className="bulk-action-select">
                                <option value="">Bulk Action</option>
                                <option value="delete">Delete</option>
                                <option value="email">Send Email</option>
                            </select>
                            <button className="bulk-action-button" onClick={handleBulkAction}>
                                Apply
                            </button>
                            <div className="group-button-table">
                                <div className="search-bar">
                                    <div className="search-wrapper">
                                        <input
                                            type="text"
                                            placeholder="Search customers..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="search-input"
                                        />
                                        <i className="search-icon fas fa-search"></i>
                                    </div>
                                </div>
                                <div className="sort-dropdown">
                                    <img
                                        src={SortIcon}
                                        alt="Sort Icon"
                                        className="sort-icon"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    />
                                    {dropdownOpen && (
                                        <ul className="sort-options">
                                            <li onClick={() => handleSortChange('default')}>Default</li>
                                            <li onClick={() => handleSortChange('asc')}>A - Z</li>
                                            <li onClick={() => handleSortChange('desc')}>Z - A</li>
                                        </ul>
                                    )}
                                </div>
                                <div className="sort-dropdown">
                                    <img src={SettingsIcon} alt="Settings Icon" className="sort-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-table">
                        <div className="user-table-header">
                            <div className="user-table-header-cell">Customer</div>
                            <div className="user-table-header-cell">Email</div>
                            <div className="user-table-header-cell">Phone</div>
                            <div className="user-table-header-cell">Payement Methods</div>
                            {usertype.user.type === "Manager" ? (
                            <div id="action-title" className="user-table-header-cell">Actions</div>
                            ) : null}
                        </div>
                        <div className="user-table-body">
                            {CustomerArray.length === 0 ? (
                                <div className="user-table-row">
                                    <div className="user-table-cell">No data available</div>
                                </div>
                            ) : (
                                CustomerArray.map((user) => (
                                    <div className="user-table-row" key={user.id}>
                                        <div className="user-table-cell">
                                            {customerImgData?.[user.id] ? (
                                                <img src={customerImgData[user.id]} alt="User" className="user-image" />
                                            ) : (
                                                <div className="avatar-circle">
                                                    {user.name.charAt(0)}{user.surname?.charAt(0)}
                                                </div>
                                            )}
                                            <div className="user-info">
                                                <p className="user-name">{user.name} {user.surname}</p>
                                            </div>
                                        </div>
                                        <div className="user-table-cell">{user.email}</div>
                                        <div className="user-table-cell">{user.phone_number || "N/A"}</div>
                                        <div className="user-table-cell">{"N/A"}</div>
                                        {usertype.user.type === "Manager" ? (
                                        <div id="action-button" className="user-table-cell">
                                            <button className="edit-button" onClick={() => handleMenuClick(user.id)}>
                                                ...
                                            </button>
                                            {editMenuOpen === user.id && (
                                                <div className="actions-dropdown">
                                                    <ul className="actions-options">
                                                        <li onClick={() => handleEditClick(user.id)}>Edit</li>
                                                        <li onClick={() => handleDeleteClick(user.id)}>Delete</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        ) : null}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {showPopup && <FormPopup onClose={() => { setShowPopup(false); refetch(); }} />}
            </div>
        </div>
    );
};

export default Customers;
