import React from "react"; 
import "../styles/LandingPage.css";


const LandingPage: React.FC = () => {
return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="illustration">
          <p>ILLUSTRATION ACTIVE PART</p>
        </div>
        <div className="content">
          <h1>Track Your Job Applications with Ease</h1>
          <p>Simplify your job search with our intuitive tool designed for college students.</p>
          <a href="#get-started" className="btn">Get Started</a>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="dashboard-overview">
        <h2>Dashboard Overview</h2>
        <p className="dashboard-description">
    A summary dashboard displaying the total number of applications submitted, applications in
    progress, scheduled interviews, offers received, and rejections.
  </p>        <div className="cards">
          <div className="card">
            <h3>Total Applications</h3>
            <p>Track the total number of job applications submitted.</p>
          </div>
          <div className="card">
            <h3>Applications in Progress</h3>
            <p>Monitor the applications that are currently in progress.</p>
          </div>
          <div className="card">
            <h3>Scheduled Interviews</h3>
            <p>Stay updated on upcoming interview schedules.</p>
          </div>
          <div className="card">
            <h3>Offers Received</h3>
            <p>Keep track of job offers received.</p>
          </div>
          <div className="card">
            <h3>Rejections</h3>
            <p>View the number of job rejections for better insights.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
 

export default LandingPage;






