import React, { useEffect } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetTipsQuery } from '../../redux/api/tipApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const Tips = () => {
    const { data, isLoading, error, isError } = useGetTipsQuery();
    console.log(data);

    //Toast error alert
    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }
    }, [isError, error?.data?.message]);

    if (isLoading) return <Loader />;

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
