import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContestOver.css";

const ContestOver: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="contestover-bg">
      <div className="contestover-card">
        <div className="contestover-animation">
          <div className="contestover-cross">
            <div className="contestover-bar contestover-bar1"></div>
            <div className="contestover-bar contestover-bar2"></div>
          </div>
        </div>
        <h1 className="contestover-title">Contest Over</h1>
        <p className="contestover-desc">
          This contest is no longer active.<br />
          Thank you for your interest!
        </p>
        <button className="contestover-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ContestOver;