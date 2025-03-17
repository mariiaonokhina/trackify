import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "../styles/SignUpForm.css";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export default function SignUpForm () {
    return (
      <div className='SignUpForm'>
          <h1>Sign Up</h1>

          <form>
            {/* Email */}
            <div className="login-email-container">
              <label htmlFor="email">Email</label>
                <input className="log-in-input-field" 
                name="email" 
                type="email"
                placeholder="johnsmith@example.com"
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
            required
            ></input>
          </div>

        <button className="login-form-btn">Sign Up</button>
      </form>

      <div className="login-github-container">
        <h3>Sign up with</h3>
        <img className="github-logo-login" src="github-brands-solid.svg" />
      </div>
    </div>
  );
}