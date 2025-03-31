import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ step, totalSteps }) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
        Step {step} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;
