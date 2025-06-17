"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Play } from "lucide-react"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Transform Your Psychology Career",
      subtitle: "Join KESA's comprehensive learning platform",
      description: "Enhance your knowledge and skills with our expert-led sessions and certification courses",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Expert-Led Sessions",
      subtitle: "Learn from industry professionals",
      description: "Access high-quality educational content designed by psychology experts",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Certification Courses",
      subtitle: "Advance your professional credentials",
      description: "Earn recognized certifications in psychology and related fields",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-kesa-blue/80 via-kesa-purple/70 to-kesa-red/60 z-10" />
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">{slides[currentSlide].title}</h1>
        <p className="text-xl md:text-2xl mb-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          {slides[currentSlide].subtitle}
        </p>
        <p className="text-lg mb-8 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          {slides[currentSlide].description}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <button className="bg-gradient-to-r from-kesa-blue to-kesa-purple hover:from-kesa-purple hover:to-kesa-blue text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all transform hover:scale-105">
            Get Started
            <ChevronRight className="ml-2" size={20} />
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-kesa-blue px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all">
            <Play className="mr-2" size={20} />
            Watch Demo
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
