import React, { useEffect } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetTipsQuery } from '../../redux/api/tipApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const Tips = () => {
    const { data, isLoading, error, isError } = useGetTipsQuery();

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }
    }, [isError, error]);

    if (isLoading) return <Loader />;

    const tipsArray = Array.isArray(data) ? data : data?.tips;

    return (
        <div className="tips-page pages">
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <h1>Tips</h1>
            <div className="separator"></div>
            <div className="tips-grid">
                {tipsArray?.map((tip, index) => (
                    <div className="tip-card" key={index}>
                        <h3>{tip.title}</h3>
                        <p>{tip.tip}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tips;
