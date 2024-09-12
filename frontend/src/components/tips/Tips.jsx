import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetTipsQuery } from '../../redux/api/tipApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import TipPopup from './TipsPopupAdd';

const Tips = () => {
    const { data, isLoading, error, isError, refetch } = useGetTipsQuery();
    const [openIndex, setOpenIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const usertype = useSelector((state) => state.auth);

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
            <div className="head-content-coaches-page">
                <div className="title-content-coaches">
                    <h1 className="page-title">Tips for Coaches</h1>
                </div>
                <div className='group-button'>
                    {usertype.user.type === "Manager" && (
                        <button className="add-button" onClick={() => setShowPopup(true)}>
                            +
                        </button>
                    )}
                </div>
            </div>
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
            {showPopup && <TipPopup onClose={() => {setShowPopup(false); refetch();}} />}
        </div>
    );
};

export default Tips;
