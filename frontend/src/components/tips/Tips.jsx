import React from "react";
import SideMenu from "../layout/SideMenu";

const TipsPage = () => {
  const tips = [
    "A super tip to help the coach with their customers",
    "A great tip to enhance productivity",
    "Another useful tip to boost client engagement",
    "A tip to optimize communication with customers",
    "A tip for better organization",
    "Effective techniques for managing time",
    "How to develop a stronger client relationship",
    "How to keep customers satisfied",
    "Tips for improving service quality"
  ];

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
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsPage;
