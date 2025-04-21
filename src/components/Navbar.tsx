import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    navigate(`/apply?title=${encodeURIComponent(title)}&loc=${encodeURIComponent(location)}`);
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
            <Link to="/login">Login</Link>
          </li>
		  <li>
            <Link className="analyzer-btn" 
			to="/resume-analyzer" 
			style={{ width: '120px' }}>Resume Analyzer</Link>
          </li>
        </ul>
      </div>

      <div className='navbar-center'>
        <span className='title-logo'><a>Trackify</a></span>
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
            <img src="search.png" className='search-icon' alt="search" />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
