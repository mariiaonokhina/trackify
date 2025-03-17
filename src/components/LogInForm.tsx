import "../styles/LogInForm.css";

export default function LogInForm () {
    return (
      <div className='LogInForm'>
          <h1>Log In</h1>

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

            <button className="login-form-btn">Log In</button>
          </form>

          <div className="login-github-container">
            <h3>Log in with</h3>
            <img className="github-logo-login" src="github-brands-solid.svg" />
          </div>
      </div>
    );
}