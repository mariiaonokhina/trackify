import "../styles/SignUpForm.css";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function SignUpForm () {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/weak-password") {
        setError("The password is too short (6 characters minimum).");
      }
      else {
        setError(err.message);
      }
    }
  };  

    return (
      <div className='SignUpForm'>
          <h1>Sign Up</h1>

          <form onSubmit={handleSignup}>
            {/* Email */}
            <div className="login-email-container">
              <label htmlFor="email">Email</label>
                <input className="log-in-input-field" 
                name="email" 
                type="email"
                placeholder="johnsmith@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>

          {/* Password */}
          <div className="login-password-container">
            <label htmlFor="password">Password</label>
            <input className="log-in-input-field"
            type="password" 
            name="password" 
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            ></input>
          </div>

          {/* Password confirmation */}
          <div className="login-password-container">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input className="log-in-input-field"
            type="password" 
            name="confirm-password" 
            placeholder="Enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            ></input>
          </div>

        <button className="login-form-btn" type="submit">Sign Up</button>
      </form>

      {error && <p className="form-error-message">{error}</p>}

      <div className="login-github-container">
        <h3>Sign up with</h3>
        <img className="github-logo-login" src="github-brands-solid.svg" />
      </div>
    </div>
  );
}