import React from 'react';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-image">
        <img src="images/splash.jpg" width="100%" />
      </div>
      <div className="landing-header">
        <div className="landing-header-img">
          <img src="images/logo.png" height="30px" />
        </div>
      </div>
      <div className="landing-text">
        <h1>Effortless trip planning</h1>
        <div className="landing-button-container">
          <a href="login">
            <button>Login</button>
            <br />
          </a>
          <a href="/signup">
            <button>Sign Up</button>
          </a>
        </div>
      </div>
    </div>
  );
};

module.exports = Landing;
