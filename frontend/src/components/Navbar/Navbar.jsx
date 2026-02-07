import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

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

  return (
    <>
      <header className="flex border-b py-4 px-4 sm:px-10 bg-black font-sans min-h-[70px] tracking-wide z-50">
        <div className="flex items-center w-full">

          {/* Logo */}
          <Link to="/">
            <h3 className="text-2xl text-blue-400 font-semibold">ClubZ0ne</h3>
          </Link>

          {/* CENTER NAV MENU */}
          <nav className="hidden lg:flex mx-auto">
            <ul className="flex gap-x-10">
              <li>
                <Link
                  to="/"
                  className={`hover:text-[#007bff] font-bold text-[15px] ${
                    location.pathname === '/' ? 'text-[#007bff]' : 'text-gray-600'
                  }`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/#clubs-section"
                  onClick={handleClubsClick}
                  className="hover:text-[#007bff] text-gray-600 font-bold text-[15px]"
                >
                  Clubs
                </Link>
              </li>

              <li>
                <Link
                  to="/posts"
                  className="hover:text-[#007bff] text-gray-600 font-bold text-[15px]"
                >
                  Posts
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-6 ml-auto">

            {isAuthenticated ? (
              <>
                <span className="hover:text-[#007bff] text-blue-500 border-2 px-3 py-2 rounded-lg border-black-200 font-bold text-[15px]">
                  Welcome, {user?.username || user?.name || "User"}
                </span>
                <button
                  onClick={logout}
                  className="hover:text-[#007bff] text-red-600 border-2 px-3 py-2 rounded-lg font-bold text-[15px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-[#007bff] text-red-600 border-2 px-3 py-2 rounded-lg border-red font-bold text-[15px]"
                >
                  Log in
                </Link>
              </>
            )}

          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
