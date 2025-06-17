"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Sessions from "./components/Sessions"
import Courses from "./components/Courses"
import Achievements from "./components/Achievements"
import Footer from "./components/Footer"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen ${isLoaded ? "animate-fadeInUp" : "opacity-0"}`}>
      <Navbar />
      <Hero />
      <About />
      <Sessions />
      <Courses />
      <Achievements />
      <Footer />
    </div>
  )
}
