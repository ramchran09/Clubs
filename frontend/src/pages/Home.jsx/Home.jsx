import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Carousel from '../../components/Smooth/Carousel'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Carousel */}
      <section className="home-hero">
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
    </div>
  )
}

export default Home
