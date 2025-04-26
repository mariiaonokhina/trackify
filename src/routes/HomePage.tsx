import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { fetchApplications, addApplication, updateApplication, deleteApplication } from "../services/firestore"; // Import Firestore functions
import "../styles/index.css";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [applications, setApplications] = useState<any[]>([]); // State to hold the list of applications
  const [showModal, setShowModal] = useState(false);
  const [editingApplication, setEditingApplication] = useState<any>(null); // App to edit
  const [showEditModal, setShowEditModal] = useState(false); // Whether to show edit modal
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "",
    salaryRange: "",
    status: "",
    waitingDeadline: "",
  });

  //Dashboard
  const applicationsInProgress = applications.filter(app => app.status === "Need to Apply").length;
  const scheduledInterviews = applications.filter(app => app.status === "Interview").length;
  const offersReceived = applications.filter(app => app.status === "Offered/Negotiation").length;
  const totalApplications = applications.length;

  // Find the earliest waitingDeadline
  const upcomingDeadline = applications
    .filter(app => app.waitingDeadline) // Make sure waitingDeadline exists
    .sort((a, b) => new Date(a.waitingDeadline).getTime() - new Date(b.waitingDeadline).getTime())[0]?.waitingDeadline;

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
    if (user === undefined || !user) return;

    const fetchData = async () => {
      console.log("Initial fetch of applications...");
      const initialApps = await fetchApplications();
      console.log("Initial applications fetched:", initialApps);
      setApplications(initialApps);
    };

    fetchData();
  }, [user]);

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to Firestore

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addApplication(formData);
      const updatedApps = await fetchApplications();
      setApplications(updatedApps);
      setFormData({
        jobTitle: "",
        company: "",
        location: "",
        jobType: "",
        salaryRange: "",
        status: "",
        waitingDeadline: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding application:", error);
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
          className="login-signup-btn button"
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

  // Format Salary
  const formatSalary = (salary: string) => {
    if (!salary) return "";
  
    // Split by "-" if exists (for ranges)
    const parts = salary.split("-").map(part => part.trim());
  
    // Format each part separately
    const formattedParts = parts.map(part => {
      const numeric = Number(part.replace(/[^0-9]/g, ""));
      if (isNaN(numeric) || numeric === 0) return part; // If can't parse number, return original text
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numeric);
    });
  
    return formattedParts.join(" - ");
  };

  return (
    <div className="home-container">
      <h2 className="welcome-message">Hello, {username}!</h2>

      {/* Dashboard Overview */}
      <section className="home-dashboard-overview">
        <div className="home-dashboard-card">
          <h3>New Updates</h3>
          <p>0</p>
        </div>
        <div className="home-dashboard-card">
          <h3>Applications in Progress</h3>
          <p>{applicationsInProgress}</p>
        </div>
        <div className="home-dashboard-card">
          <h3>Scheduled Interviews</h3>
          <p>{scheduledInterviews}</p>
        </div>
        <div className="home-dashboard-card">
          <h3>Offers Received</h3>
          <p>{offersReceived}</p>
        </div>
        <div className="home-dashboard-card">
          <h3>Total Applications</h3>
          <p>{totalApplications}</p>
        </div>
        <div className="home-dashboard-card">
          <h3>Upcoming Deadline</h3>
          <p>{upcomingDeadline ? upcomingDeadline : "N/A"}</p>
        </div>
      </section>

      {/* Add Application Button */}
      <button className="add-application-btn button" onClick={() => setShowModal(true)}>
        Add New Application
      </button>

      {/* Modal Popup Form */}
      {showModal && (
        <div className="application-modal">
          <div className="application-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title:</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleFormChange} required/>
            </div>

            <div className="form-group">
              <label>Company:</label>
              <input type="text" name="company" value={formData.company} onChange={handleFormChange} required/>
            </div>

            <div className="form-group">
              <label>Location:</label>
              <input type="text" name="location" value={formData.location} onChange={handleFormChange} required/>
            </div>

            <div className="form-group">
              <label>Job Type:</label>
              <select name="jobType" value={formData.jobType} onChange={handleFormChange} required>
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Salary Range (USD):</label>
              <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleFormChange} placeholder="e.g. 55000 - 75000" required/>
            </div>

            <div className="form-group">
              <label>Status:</label>
              <select name="status" value={formData.status} onChange={handleFormChange} required>
              <option value="">Select status</option>
              <option value="Need to Apply">Need to Apply</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offered/Negotiation">Offered/Negotiation</option>
            </select>
            </div>

            <div className="form-group">
              <label>Waiting Deadline:</label>
              <input type="date" name="waitingDeadline" value={formData.waitingDeadline} onChange={handleFormChange} required/>
            </div>

            <button type="submit" className="login-signup-btn button">Submit</button>
            <button type="button" className="login-signup-btn button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </form>
          </div>
        </div>
      )}
      {showEditModal && editingApplication && (
        <div className="application-modal">
          <div className="application-form">
            <form onSubmit={async (e) => {
              e.preventDefault();
              await updateApplication(editingApplication.id, editingApplication);
              const updatedApps = await fetchApplications();
              setApplications(updatedApps);
              setShowEditModal(false);
              setEditingApplication(null);
            }}>
              {["jobTitle", "company", "location", "jobType", "salaryRange", "status", "waitingDeadline"].map((field) => (
                <div className="form-group" key={field}>
                  <label>{field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</label>
                  {field === "status" ? (
                    <select
                      name={field}
                      value={(editingApplication as any)[field]}
                      onChange={(e) =>
                        setEditingApplication({ ...editingApplication, [field]: e.target.value })
                      }
                    >
                      <option value="Need to Apply">Need to Apply</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offered/Negotiation">Offered/Negotiation</option>
                    </select>
                  ) : field === "jobType" ? (
                    <select
                      name={field}
                      value={(editingApplication as any)[field]}
                      onChange={(e) =>
                        setEditingApplication({ ...editingApplication, [field]: e.target.value })
                      }
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  ) : field === "waitingDeadline" ? (
                    <input
                      type="date"
                      name={field}
                      value={(editingApplication as any)[field]}
                      onChange={(e) =>
                        setEditingApplication({ ...editingApplication, [field]: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={(editingApplication as any)[field]}
                      onChange={(e) =>
                        setEditingApplication({ ...editingApplication, [field]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}

              <button type="submit" className="login-signup-btn button">Save Changes</button>
              <button
                type="button"
                className="login-signup-btn button"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingApplication(null);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Applications Section */}
      <section className="applications">
        <h2>Applications</h2>
        <div className="application-list">
          {applications.map((app) => (
            <div className="application-item" key={app.id}>
            <strong>{app.jobTitle}</strong> at <strong>{app.company}</strong> — {app.location} | {app.jobType} | {formatSalary(app.salaryRange)} | {app.status} | Deadline: {app.waitingDeadline}
          
            {/* Edit and Delete buttons */}
            <div style={{ marginTop: "10px" }}>
              <button className="edit-del-btn button" onClick={() => {
                setEditingApplication(app);
                setShowEditModal(true);
              }}><img className="icon" src="../public/edit.png"/></button>
          
              <button className="edit-del-btn button" style={{ marginLeft: "10px" }} onClick={async () => {
                if (window.confirm('Are you sure you want to delete this application?')) {
                  await deleteApplication(app.id);
                  const updatedApps = await fetchApplications();
                  setApplications(updatedApps);
                }
              }}><img className="icon" src="../public/bin.png"/></button>
            </div>
          </div>          
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
