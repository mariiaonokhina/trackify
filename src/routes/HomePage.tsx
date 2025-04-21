import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { STATUS_OPTIONS, Status } from "../constants/Statuses";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div className="home-container">Loading…</div>;
  }

  // If not logged in
  if (!user) {
    return (
      <div className="home-container">
        <h2 className="welcome-message">
          Hello, looks like you’re not logged in.
        </h2>
        <button
          className="login-signup-btn"
          onClick={() => navigate("/login")}
        >
          Log In or Sign Up
        </button>
      </div>
    );
  }
 // Otherwise, show the normal dashboard
 const displayName = user.displayName || user.email || "User";
 const username = displayName.split("@")[0];

 return (
   <div className="home-container">
     <h2 className="welcome-message">Hello, {username}!</h2>

     <section className="dashboard-overview">
       <div className="dashboard-card">
         <h3>New Updates</h3>
         <p>3</p>
       </div>
       <div className="dashboard-card">
         <h3>Applications in Progress</h3>
         <p>6</p>
       </div>
       <div className="dashboard-card">
         <h3>Scheduled Interviews</h3>
         <p>2</p>
       </div>
       <div className="dashboard-card">
         <h3>Offers Received</h3>
         <p>2</p>
       </div>
       <div className="dashboard-card">
         <h3>Total Applications</h3>
         <p>17</p>
       </div>
       <div className="dashboard-card">
         <h3>Upcoming Deadline</h3>
         <p>March 10</p>
       </div>
     </section>

     <section className="applications">
       <h2>Applications</h2>
       <div className="application-list">
         <div className="application-item">
           Software Engineer | Google | Mountain View, CA | Full-time | $130,000 -
           $180,000
         </div>
         <div className="application-item">
           Data Scientist | Amazon | Seattle, WA | Full-time | $120,000 -
           $160,000
         </div>
         <div className="application-item">
           Backend Developer | Microsoft | Redmond, WA | Full-time | $110,000 -
           $150,000
         </div>
         <div className="application-item">
           Frontend Developer | Meta | Menlo Park, CA | Full-time | $115,000 -
           $155,000
         </div>
         <div className="application-item">
           Machine Learning Engineer | Apple | Cupertino, CA | Full-time | $140,000
           - $190,000
         </div>
         <div className="application-item">
           DevOps Engineer | IBM | Armonk, NY | Full-time | $100,000 - $140,000
         </div>
         <div className="application-item">
           Cybersecurity Analyst | Palantir | Denver, CO | Full-time | $105,000 -
           $145,000
         </div>
         <div className="application-item">
           Product Manager | LinkedIn | Sunnyvale, CA | Full-time | $125,000 -
           $175,000
         </div>
       </div>
     </section>
   </div>
 );
};

export default HomePage;