import React from "react";
import { useGetTipsQuery } from "../../redux/api/tipApi";
import SideMenu from "../layout/SideMenu";

const TipsPage = () => {
  const { data: tips, error, isLoading } = useGetTipsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error loading tips:", error);
    return <div>Error loading tips</div>;
  }

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
            <p>{tip.title}</p>
            <p>{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsPage;