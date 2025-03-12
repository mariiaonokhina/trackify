import './Navbar.css'

function Navbar() {
  return (
    <nav className='navbar' role='navigation'>
					<div className='navbar-left'>
            <ul className='nav-button'>
						<li>
							<a>Home</a>
						</li>
						<li>
							<a>Apply/Resources</a>
						</li>
						<li>
							<a>Profile</a>
						</li>
						<li>
							<a>Setting</a>
						</li>
						<li>
							<a>Login</a>
						</li>
            </ul>
					</div>
					<div className='navbar-center'>
						<span className='title-logo' >
							<a>Trackify</a>
						</span>
					</div>
					<div className='navbar-right'>
            <img
						  src={"src/assets/accessibility.svg"} 
						  className='accessibility'
					  />
						<span className="search-bar" >
							{"Search"}
              <img
							src={"src/assets/search.png"} 
							className='search-icon'
						  />
						</span>
					</div>
    </nav>
  )
}

export default Navbar
