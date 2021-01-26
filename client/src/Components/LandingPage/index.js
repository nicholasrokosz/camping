import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="hero-container">
      <video autoPlay loop muted id="myVideo">
        <source src="./images/campingVideo.mp4" />
      </video>
      <h1> Adventure Awaits</h1>

      <p>What are you waiting for?</p>

      <div className="hero-btns">
        <button type="button" className="btn btn-primary">
          LOG IN
        </button>
      </div>
    </div>
  );
}

export default LandingPage;