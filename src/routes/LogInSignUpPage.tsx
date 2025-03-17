import { useState } from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import "../styles/LogInSignUpPage.css";

export default function LogInSignUpPage() {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className='LogInSignUpPage'>
      {hasAccount?
        <div>
          <LogInForm />
          <p>Don't have an account? <span onClick={()=>{setHasAccount(false);}}>Sign Up</span></p>
        </div>
      : 
        <div>
          <SignUpForm />
          <p>Already have an account? <span onClick={()=>{setHasAccount(true);}}>Log In</span></p>
        </div>
      }
    </div>
  );
}