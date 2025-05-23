import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/LogInForm.css";

export default function LogInForm () {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") {
        setError("Wrong email or password.");
      } else {
        setError(err.message);
      }
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/home");
    } catch (err: any) {
      alert("GitHub login failed: " + err.message);
    }
  };

    return (
      <div className='LogInForm'>
          <h1>Log In</h1>

          <form onSubmit={handleLogin}>
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

            <button className="login-form-btn button" type="submit">Log In</button>
          </form>

          {error && <p className="form-error-message">{error}</p>}

          <div className="login-github-container">
            <h3>Log in with</h3>
            <img onClick={handleGitHubLogin} className="github-logo-login" src="github-brands-solid.svg" />
          </div>
      </div>
    );
}