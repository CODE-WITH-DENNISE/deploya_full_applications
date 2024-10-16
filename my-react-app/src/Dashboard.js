import React from 'react';
import './hhm.css'; // You can use this for external CSS

const App = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Dashboard Section */}
      <div className="dashboard">
        <div className="dashboard-item">
          <h3>Dashboard Item 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        </div>
        <div className="dashboard-item">
          <h3>Dashboard Item 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        </div>
        <div className="dashboard-item">
          <h3>Dashboard Item 3</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
