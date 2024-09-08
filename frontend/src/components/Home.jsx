import React from 'react';
import SideMenu from "./layout/SideMenu";

const Home = () => {
    return (
        <div>
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <p className="text-center mt-1">
                Home
            </p>
        </div>
    );
};

export default Home;