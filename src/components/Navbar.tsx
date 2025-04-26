import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../services/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import "../styles/index.css";
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // Track logged-in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    navigate(`/apply?title=${encodeURIComponent(title)}&loc=${encodeURIComponent(location)}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar-left'>
        <div className='mobile-menu-icon' onClick={toggleMobileMenu}>
          &#9776;
        </div>
        <ul className={`nav-button ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/apply">Apply/Resources</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {user ? (
              <button className="signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
		  <li>
            <Link className="analyzer-btn" 
			to="/resume-analyzer" 
			>Resume Analyzer</Link>
          </li>
        </ul>
      </div>

      <div className='navbar-center'>
        <span className='title-logo'><h1>Trackify</h1></span>
      </div>

      <div className='navbar-right'>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">
            <img src="search.png" className='icon' alt="search" />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
