import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "../styles/SignUpForm.css";

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