import React, { useEffect, useState } from "react";
import SideMenu from "../layout/SideMenu";
import Loader from "../layout/Loader"; // Assurez-vous que ce chemin est correct

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch("/api/tips");
        console.log("Response status:", response.status); // Ajoutez ce log
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Ajoutez ce log
        setTips(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Fetch error:", err); // Ajoutez ce log
        setError(err);
        setIsLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading tips: {error.message}</div>;

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