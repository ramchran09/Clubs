import React, { useState, useRef, useCallback } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Carousel from '../../components/Smooth/Carousel'
import './Home.css'

// Sample club data for the slider
const sampleClubs = [
  {
    _id: '1',
    name: 'Robotics Club',
    description: 'Building the future with automation and AI',
    logo: '🤖',
    memberCount: 45,
    category: 'Technology'
  },
  {
    _id: '2',
    name: 'Photography Club',
    description: 'Capturing moments and creating memories',
    logo: '📷',
    memberCount: 32,
    category: 'Arts'
  },
  {
    _id: '3',
    name: 'Debate Society',
    description: 'Fostering critical thinking and public speaking',
    logo: '🎤',
    memberCount: 28,
    category: 'Academic'
  },
  {
    _id: '4',
    name: 'Music Ensemble',
    description: 'Creating harmony through collaboration',
    logo: '🎵',
    memberCount: 56,
    category: 'Arts'
  },
  {
    _id: '5',
    name: 'Coding Club',
    description: 'Learning and building software together',
    logo: '💻',
    memberCount: 67,
    category: 'Technology'
  }
]

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slideRef = useRef(null)

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % sampleClubs.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + sampleClubs.length) % sampleClubs.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const handleClubClick = (clubId) => {
    // Navigate to club detail page
    window.location.href = `/clubs/${clubId}`
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Carousel */}
      <Carousel />
      
      {/* Clubs Section */}
      <section id="clubs-section" className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Discover Clubs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our vibrant community of student-led organizations and find your perfect match
            </p>
          </div>

          {/* Clubs Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm"
              aria-label="Previous club"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm"
              aria-label="Next club"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Club Card */}
            <div 
              ref={slideRef}
              className="overflow-hidden rounded-2xl"
            >
              <div 
                className={`transition-all duration-500 ease-in-out transform ${
                  isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                <div 
                  onClick={() => handleClubClick(sampleClubs[currentIndex]._id)}
                  className="cursor-pointer"
                >
                  {/* Club Banner */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-700 rounded-t-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl">{sampleClubs[currentIndex].logo}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                        {sampleClubs[currentIndex].category}
                      </span>
                    </div>
                  </div>

                  {/* Club Info */}
                  <div className="bg-gray-800 rounded-b-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {sampleClubs[currentIndex].name}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {sampleClubs[currentIndex].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        {sampleClubs[currentIndex].memberCount} members
                      </span>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {sampleClubs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-500 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Browse All Clubs Button */}
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700">
              Browse All Clubs
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Discover</h3>
              <p className="text-gray-400">Find clubs that match your interests and passions</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Connect</h3>
              <p className="text-gray-400">Meet like-minded peers and build lasting relationships</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Grow</h3>
              <p className="text-gray-400">Develop skills and create amazing experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© 2024 ClubZ0ne. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Home
