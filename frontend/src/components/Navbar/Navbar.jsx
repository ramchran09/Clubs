import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const na="Revanth";
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
      <header className=" flex border-b py-4 px-4 sm:px-10  rounded-md bg-linear-to-r from-cyan-200 to-blue-300 font-sans min-h-[70px] tracking-wide z-50">
        <div className="flex items-center w-full">


          <Link to="/">
            <h3 className="text-2xl text-[hsla(0,96%,49%,1)] font-semibold">ClubZ0ne</h3>
          </Link>


          <nav className="hidden lg:flex mx-auto">
            <ul className="flex gap-x-10 border-2 border-[#485d76b6] rounded-full  py-2 px-17  " >
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
                  to="#Clubs"
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


          <div className="flex items-center justify-end space-x-6 ml-auto w-full max-w-48">

            {isAuthenticated ? (
              <>
                <span className="hover:border-[#007bff] text-pink-950  border-[#5f9ee1] border-2 px-3 py-2 rounded-full bg-[#0f94c1e1] font-bold text-[15px]">
                   {user?.username?.slice(0,4) || user?.name || na?.slice(0,1)}
                </span>
                <button
                  onClick={logout}
                  className="hover:text-[#ff0000] text-red-600 border-2 px-3 py-2 rounded-full font-bold text-[15px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-[#3697ec] text-[#156dd9e1] border-2 px-3 py-2 rounded-full  font-bold text-[15px]"
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
