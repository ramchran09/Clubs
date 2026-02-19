import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Smooth/Carousel";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import api from "../../api/mockApi";

const Home = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch clubs from API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const clubsData = await api.getClubs();
        setClubs(clubsData);
      } catch (err) {
        setError("Failed to load clubs");
        console.error("Error fetching clubs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="home-container">
      <div className="sectionss">
        {/* Navbar */}
        <div className="nav-bar">
          <Navbar />
        </div>

        {/* Hero Carousel */}
        <section className="home-hero">
          <Carousel />
        </section>

        {/* Welcome Section */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl  font-bold mb-4">WELCOME TO CLUBZ0NE</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing clubs, join events, and connect with like-minded
            people. Your journey starts here!
          </p>
        </section>

        {/* Clubs Section */}
        <section className="py-16 px-6 bg-gray-100" id="clubs-section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Explore Clubs
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Find your community and get involved in activities that interest you.
            </p>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {/* Clubs Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {clubs.map((club) => (
                  <div
                    key={club._id}
                    className="cursor-pointer group transform transition duration-300 hover:-translate-y-3"
                    onClick={() => navigate(`/clubs/${club._id}`)}
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-square shadow-lg mb-3">
                      <img
                        src={club.image}
                        alt={club.clubname}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <h3 className="text-center font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                      {club.clubname}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <section className="footer">
        <Footer />
      </section>
    </div>
  );
};

export default Home;

