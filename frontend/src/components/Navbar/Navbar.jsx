import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleClubsClick = (e) => {
    // If we're on the home page, scroll to clubs section
    if (location.pathname === '/') {
      e.preventDefault();
      const clubsSection = document.getElementById('clubs-section');
      if (clubsSection) {
        clubsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
     <header className="sticky top-4 z-50">
  <div className="backdrop-blur-xl bg-white/40 shadow-lg rounded-2xl px-8 py-1 flex items-center justify-between border border-white/30">

    {/* Logo */}
    <Link to="/">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-wide">
        ClubZ0ne
      </h3>
    </Link>

    {/* Navigation */}
    <nav className="hidden lg:flex ">
      <ul className="flex gap-10 text-[15px] font-semibold">
        <li>
          <Link
            to="/"
            className={`transition duration-300 hover:text-blue-600 ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="#clubs"
            onClick={handleClubsClick}
            className="transition duration-300 hover:text-blue-600 text-gray-700"
          >
            Clubs
          </Link>
        </li>

        <li>
          <Link
            to="/posts"
            className="transition duration-300 hover:text-blue-600 text-gray-700"
          >
            Posts
          </Link>
        </li>
      </ul>
    </nav>

    {/* Right Section */}
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          {/* User Info with Role Badge */}
          <div className="flex items-center gap-5">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full font-bold shadow-md">
              {user?.fullName?.slice(0, 10) || "User"}
            </span>
            
            {/* Admin Badge */}
            {isAdmin && (
              <span className="animate-pulse  hover:bg-red-500 hover:text-amber-50  text-red-600  px-2 py-1 rounded-full text-xs  font-bold shadow-md">
                A
              </span>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="border border-red-500 text-red-500 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1 rounded-full font-semibold shadow-2xl hover:scale-105 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  </div>
</header>
    </>
  )
}

export default Navbar

