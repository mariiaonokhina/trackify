import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className='navbar' role='navigation'>
					<div className='navbar-left'>
            <ul className='nav-button'>
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
							<a>Settings</a>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
            </ul>
					</div>
					<div className='navbar-center'>
						<span className='title-logo' >
							<a>Trackify</a>
						</span>
					</div>
					<div className='navbar-right'>
						<span className="search-bar" >
							{"Search"}
              <img
							src={"search.png"} 
							className='search-icon'
						  />
						</span>
					</div>
    </nav>
  )
}

export default Navbar
