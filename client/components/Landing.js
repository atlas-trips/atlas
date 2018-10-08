import React from 'react';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-image">
        <img src="images/splash.jpg" width="100%" />
      </div>
      <div className="landing-header">
        <div className='landing-header-img'>
          <img src='images/logo.png' height='30px' />
        </div>
        <div className='landing-header-txt'>
          <a href="login">
            <h4>Login</h4>
          </a>
        </div>
        
      </div>
      <div className="landing-text">
        <h1>What was the slogan again</h1>
        <a href="/signup">
          <button>sign up</button>
        </a>
      </div>
    </div>
  );
};

module.exports = Landing;
