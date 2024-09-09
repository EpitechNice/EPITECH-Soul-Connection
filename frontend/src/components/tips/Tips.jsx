import React from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetTipsQuery } from '../../redux/api/tipApi';

const Tips = () => {
    const { data } = useGetTipsQuery();
    console.log(data);

    return (
        <div>
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <p className="text-center mt-1">
                Tips
            </p>
        </div>
    );
};

export default Tips;
