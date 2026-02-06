import React, { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    image: "https://sreenidhi.edu.in/wp-content/uploads/2022/06/Rapid-prototype-3d-printed-min-scaled-1.png",
    title: "Rangoli Event",
    subtitle: "Join now"
  },
  {
    id: 2,
    image: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    title: "Popular Series",
    subtitle: "Stream now"
  },
  {
    id: 3,
    image: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    title: "New Release",
    subtitle: "Coming soon"
  },
  {
    id: 4,
    image: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
    title: "Trending Now",
    subtitle: "Don't miss"
  }
]

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div 
      className="relative w-full h-[70vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-[70vh] flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-4 text-gray-200">{slide.subtitle}</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-red-600 w-16' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
