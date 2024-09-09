import React, { useEffect, useState } from "react";
import SideMenu from "../layout/SideMenu";
import { useGetTipsQuery } from "../redux/api/tipApi.js";

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch("/api/tips");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTips(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tips</div>;

  return (
    <div className="tips-page pages">
      <div className="col-12 col-lg-3">
        <SideMenu />
      </div>
      <h1>Tips</h1>
      <div className="separator"></div>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div className="tip-card" key={index}>
            <p>{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;