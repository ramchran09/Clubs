import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Carousel from '../../components/Smooth/Carousel'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const clubs = [
  {
    id: 1,
    name: 'Coding Club',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Photography Club',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Debate Society',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Music Band',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'Environmental Club',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    name: 'Chess Club',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop',
  },
  {
    id: 7,
    name: 'Drama Club',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop',
  },
  {
    id: 8,
    name: 'Sports Club',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
  },
  {
    id: 9,
    name: 'Art Club',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
  },
  {
    id: 10,
    name: 'Robotics Club',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
  },
  {
    id: 11,
    name: 'Language Club',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop',
  },
  {
    id: 12,
    name: 'Business Club',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      <div className='sectionss'>
        <section className='nav-bar'>
            <Navbar />
        </section>
      
      {/* Hero Carousel */}
      <section className="home-hero ">
        <Carousel />
      </section>
      
      {/* Welcome Section */}
      <section className="section">
        <h2 className="section-title">Welcome to ClubZ0ne</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Discover amazing clubs, join events, and connect with like-minded people. 
          Your journey starts here!
        </p>
      </section>
        
      {/* Clubs List Section */}
      <section className="section bg-white" id="clubs-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Explore Clubs</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Find your community and get involved in activities that interest you.
          </p>
          
          {/* Scrollable Clubs List */}
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
            
            {clubs.map((club) => (
              <div 
                key={club.id}
                className="flex-shrink-0 w-48 snap-center cursor-pointer group"
                onClick={() => navigate(`/clubs/${club.id}`)}
                
              >
                <div className="relative overflow-hidden rounded-xl aspect-square mb-3">
                  
                  <img 
                    src={club.image} 
                    alt={club.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-center font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {club.name}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>
      </div>

      {/* Footer Section */}
      <section  >
        <Footer/>
      </section>
    </div>
  );
};

export default Home;
