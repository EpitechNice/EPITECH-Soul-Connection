import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";

const Employees = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="employees pages">
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <h1>Coaches</h1>
            <div class="separator"></div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <section id="employees" className="mt-5 col-12 col-lg-9">

                    <div className="user-table-header d-flex">
                        <div className="user-table-header-cell">Number</div>
                        <div className="user-table-header-cell">Name</div>
                        <div className="user-table-header-cell">Email</div>
                        <div className="user-table-header-cell">Birth Date</div>
                        <div className="user-table-header-cell">Customers</div>
                        <div className="user-table-header-cell">Last connection</div>
                    </div>

                    <div className="user-table-body">
                        {users.map((user, index) => (
                            <div className="user-table-row d-flex" key={user.login.uuid}>
                                <div className="user-table-cell">{index + 1}</div>
                                <div className="user-table-cell">{user.name.first} {user.name.last}</div>
                                <div className="user-table-cell">{user.email}</div>
                                <div className="user-table-cell">{formatDate(user.dob.date)}</div>
                                <div className="user-table-cell">Edit List ...</div>
                                <div className="user-table-cell">...</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Employees;
