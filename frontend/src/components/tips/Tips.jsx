import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetTipsQuery, useCreateTipMutation, useUpdateTipMutation, useDeleteTipMutatio } from '../../redux/api/tipApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const Tips = () => {
    const { data, isLoading, error, isError } = useGetTipsQuery();
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }
    }, [isError, error]);

    if (isLoading) return <Loader />;

    const tipsArray = Array.isArray(data) ? data : data?.tips;

    const toggleTip = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="tips-page pages">
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <h1>Tips for Coaches</h1>
            <div className="tips-list">
                {tipsArray?.map((tip, index) => (
                    <div className="tip-item" key={index}>
                        <div 
                            className="tip-header" 
                            onClick={() => toggleTip(index)}
                        >
                            <h3>{tip.title}</h3>
                            <span>{openIndex === index ? '▲' : '▼'}</span>
                        </div>
                        {openIndex === index && (
                            <div className="tip-content">
                                <p>{tip.tip}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tips;
