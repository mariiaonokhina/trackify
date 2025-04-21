import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { fetchApplications, addApplication } from "../services/firestore"; // Import Firestore functions
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [applications, setApplications] = useState<any[]>([]); // State to hold the list of applications
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "",
    salaryRange: "",
  });

  const navigate = useNavigate();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch applications from Firestore on initial load
  useEffect(() => {
    const fetchData = async () => {
      console.log("Initial fetch of applications...");
      const initialApps = await fetchApplications();
      console.log("Initial applications fetched:", initialApps);
      setApplications(initialApps);
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting this data:", formData); // ✅ Log the form data
  
    try {
      await addApplication(formData);
      console.log("Application added successfully!"); // ✅ Confirm submission
  
      const updatedApps = await fetchApplications();
      setApplications(updatedApps);
      setFormData({
        jobTitle: "",
        company: "",
        location: "",
        jobType: "",
        salaryRange: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error adding document:", error); // ✅ Catch and display any error
    }
  };
  

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

      {/* Dashboard Overview */}
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
          <p>{applications.length}</p> {/* Display total applications */}
        </div>
        <div className="dashboard-card">
          <h3>Upcoming Deadline</h3>
          <p>March 10</p>
        </div>
      </section>

      {/* Button to add new application */}
      <button
        className="add-application-btn"
        onClick={() => setShowForm(true)} // Show the form when clicked
      >
        Add New Application
      </button>

      {/* Show the form to add a new application */}
      {showForm && (
        <div className="application-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Job Type:</label>
              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Salary Range:</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Close Form
            </button>
          </form>
        </div>
      )}

      {/* Applications section - Now it's below the form */}
      <section className="applications">
        <h2>Applications</h2>
        <div className="application-list">
          {applications.map((app) => (
            <div className="application-item" key={app.id}>
              {app.jobTitle} | {app.company} | {app.location} | {app.jobType} | {app.salaryRange}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
