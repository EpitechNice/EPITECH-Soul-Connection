import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetEmployeesQuery, useGetEmployeeImgQuery, useCreateEmployeeMutation, useDeleteEmployeeMutation, useUpdateEmployeeMutation } from '../../redux/api/employeeApi';
import toast from "react-hot-toast";
import Loader from '../layout/Loader';
import IconDownload from '../../assets/Download.svg';
import SortIcon from '../../assets/Sort.svg';
import SettingsIcon from '../../assets/Settings.svg';
import { useSelector } from 'react-redux';
import FormPopup from './FormPopup';

const Employees = () => {
    const { data, isLoading, error, isError } = useGetEmployeesQuery();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('default');
    const [showPopup, setShowPopup] = useState(false);
    const { employeeImgData } = "../../assets/images/employees";
    const { mutate: createEmployee } = useCreateEmployeeMutation();
    const { mutate: deleteEmployee } = useDeleteEmployeeMutation();
    const { mutate: updateEmployee } = useUpdateEmployeeMutation();
    const usertype = useSelector((state) => state.auth);

    useEffect(() => {
        if (data) {
            setUsers(data.coach || []);
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

    const downloadCSV = () => {
        const csvRows = [];
        csvRows.push(['Name', 'Email', 'Phone', 'Number of Customers'].join(','));
        users.forEach(user => {
            const row = [
                `${user.name} ${user.surname}`,
                user.email,
                user.phone || 'N/A',
                user.customers?.length || 'N/A'
            ];
            csvRows.push(row.join(','));
        });
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees_list.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleBulkAction = () => {
        const selectedAction = document.querySelector('.bulk-action-select').value;
        if (selectedAction === 'delete') {
            deleteEmployee();
        } else if (selectedAction === 'email') {
            // Send email to selected users
        }
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.name} ${user.surname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    if (isLoading) return <Loader />;
    const EmployeeArray = Array.isArray(filteredUsers) ? filteredUsers : [];

    return (
        <div className="employees-page">
            <div className="side-menu">
                <SideMenu />
            </div>
            <div className="main-content">
                <div className="head-content-coaches-page">
                    <div className="title-content-coaches">
                        <h1 className="page-title">Coaches List</h1>
                        <p className="page-subtitle">You have total {users.length} coaches.</p>
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
                                            placeholder="Search coaches..."
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
                            <div className="user-table-header-cell">Coach</div>
                            <div className="user-table-header-cell">Email</div>
                            <div className="user-table-header-cell">Phone</div>
                            <div className="user-table-header-cell">Number of customers</div>
                            <div id="action-title" className="user-table-header-cell">Actions</div>
                        </div>
                        <div className="user-table-body">
                            {EmployeeArray.length === 0 ? (
                                <div className="user-table-row">
                                    <div className="user-table-cell">No data available</div>
                                </div>
                            ) : (
                                EmployeeArray.map((user) => (
                                    <div className="user-table-row" key={user.id}>
                                        <div className="user-table-cell">
                                            {employeeImgData?.[user.id] ? (
                                                <img src={employeeImgData[user.id]} alt="User" className="user-image" />
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
                                        <div className="user-table-cell">{user.phone || "N/A"}</div>
                                        <div className="user-table-cell">{user.customers?.length || "N/A"}</div>
                                        <div id="action-button" className="user-table-cell">
                                            <button className="edit-button">
                                                ...
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {showPopup && <FormPopup onClose={() => setShowPopup(false)} />}
            </div>
        </div>
    );
};

export default Employees;
