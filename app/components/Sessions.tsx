"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"

interface Session {
  id: number
  title: string
  date: string
  time: string
  fee: string
  mode: "online" | "offline"
  banner: string
  registrationLink: string
  description: string
}

export default function Sessions() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sessions, setSessions] = useState<Session[]>([])

  // Sample data - in real app, this would come from API
  useEffect(() => {
    const sampleSessions: Session[] = [
      {
        id: 1,
        title: "Clinical Case History Taking and MSE",
        date: "2024-02-15",
        time: "10:00 AM",
        fee: "₹999",
        mode: "online",
        banner: "/placeholder.svg?height=300&width=500",
        registrationLink: "#",
        description: "Learn comprehensive techniques for clinical case history taking and mental status examination.",
      },
      {
        id: 2,
        title: "Psychology Coaching Basics",
        date: "2024-02-20",
        time: "2:00 PM",
        fee: "₹799",
        mode: "offline",
        banner: "/placeholder.svg?height=300&width=500",
        registrationLink: "#",
        description: "Master the fundamentals of psychology coaching and client interaction.",
      },
      {
        id: 3,
        title: "Cognitive Behavioral Therapy Techniques",
        date: "2024-02-25",
        time: "11:00 AM",
        fee: "₹1299",
        mode: "online",
        banner: "/placeholder.svg?height=300&width=500",
        registrationLink: "#",
        description: "Explore advanced CBT techniques for effective therapeutic interventions.",
      },
    ]
    setSessions(sampleSessions)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sessions.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sessions.length) % sessions.length)
  }

  useEffect(() => {
    if (sessions.length > 0) {
      const timer = setInterval(nextSlide, 5000)
      return () => clearInterval(timer)
    }
  }, [sessions.length])

  const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const target = new Date(targetDate).getTime()
        const difference = target - now

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          })
        }
      }, 1000)

      return () => clearInterval(timer)
    }, [targetDate])

    return (
      <div className="flex space-x-4 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-gradient-to-r from-kesa-red to-kesa-yellow text-white rounded-lg p-3 min-w-[60px]">
              <div className="text-2xl font-bold">{value}</div>
            </div>
            <div className="text-xs text-gray-600 mt-1 capitalize">{unit}</div>
          </div>
        ))}
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <section id="sessions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
          <p className="text-gray-600">Loading sessions...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="sessions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
          <div className="w-24 h-1 bg-kesa-blue mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our expert-led sessions designed to enhance your psychology knowledge and practical skills.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {sessions.map((session) => (
                <div key={session.id} className="carousel-slide">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden card-hover">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <img
                            src={session.banner || "/placeholder.svg"}
                            alt={session.title}
                            className="w-full h-64 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-1/2 p-8">
                          <div className="flex items-center mb-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                session.mode === "online" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {session.mode === "online" ? "Online" : "Offline"}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-4">{session.title}</h3>

                          <p className="text-gray-600 mb-6">{session.description}</p>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="mr-3" size={18} />
                              <span>{new Date(session.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="mr-3" size={18} />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="mr-3" size={18} />
                              <span className="font-semibold text-blue-600">{session.fee}</span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Time Remaining:</h4>
                            <CountdownTimer targetDate={session.date} />
                          </div>

                          <button className="w-full bg-gradient-to-r from-kesa-blue to-kesa-purple hover:from-kesa-purple hover:to-kesa-blue text-white font-semibold py-3 px-6 rounded-lg transition-all">
                            Click Now to Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {sessions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
