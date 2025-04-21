import React from 'react';
import '../styles/ApplyResourceSidebar.css';

  function ApplyResourceSidebar() {
    const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
  
    return (
        <div className="sidebar">
        <h2 className="sidebar-title">Navigation</h2>
        <ul className="sidebar-list">
        <li className="sidebar-list-item"><button onClick={() => scrollToSection("apply")} className='sidebar-button'>Apply</button></li>
        <li className="sidebar-list-item"></li>
        <li className="sidebar-list-item"><button onClick={() => scrollToSection("resources")} className='sidebar-button'>Resources</button></li>
        </ul>
      </div>
    );
  };

export default ApplyResourceSidebar