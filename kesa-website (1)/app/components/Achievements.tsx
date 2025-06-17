"use client"

import { useState, useEffect } from "react"
import { Users, Calendar, Award, Star } from "lucide-react"

export default function Achievements() {
  const [counts, setCounts] = useState({
    sessions: 0,
    years: 0,
    participants: 0,
    resourcePersons: 0,
  })

  const finalCounts = {
    sessions: 43,
    years: 3,
    participants: 2000,
    resourcePersons: 25,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    const timers = Object.keys(finalCounts).map((key) => {
      const finalValue = finalCounts[key as keyof typeof finalCounts]
      const increment = finalValue / steps

      return setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          [key]: Math.min(prev[key as keyof typeof prev] + increment, finalValue),
        }))
      }, stepDuration)
    })

    setTimeout(() => {
      timers.forEach((timer) => clearInterval(timer))
      setCounts(finalCounts)
    }, duration)

    return () => timers.forEach((timer) => clearInterval(timer))
  }, [])

  const achievements = [
    {
      icon: Calendar,
      count: Math.floor(counts.sessions),
      label: "Completed Sessions",
      description: "Successfully delivered educational sessions",
    },
    {
      icon: Award,
      count: Math.floor(counts.years),
      label: "Years of Excellence",
      description: "Continuous commitment to quality education",
    },
    {
      icon: Users,
      count: Math.floor(counts.participants),
      label: "Participants",
      description: "Learners who have benefited from our programs",
    },
    {
      icon: Star,
      count: Math.floor(counts.resourcePersons),
      label: "Resource Persons",
      description: "Expert facilitators and industry professionals",
    },
  ]

  return (
    <section
      id="achievements"
      className="py-20"
      style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ef4444 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            KESA's journey of excellence in psychology education, marked by significant milestones and continuous
            growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 card-hover">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                    <Icon className="text-white" size={32} />
                  </div>

                  <div className="text-4xl font-bold text-white mb-2 countdown-timer">{achievement.count}+</div>

                  <h3 className="text-xl font-semibold text-white mb-3">{achievement.label}</h3>

                  <p className="text-blue-100 text-sm">{achievement.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Growing Community</h3>
            <p className="text-blue-100 mb-6">
              Be part of KESA's mission to advance psychology education and professional development. Together, we're
              building a stronger, more knowledgeable community of psychology professionals.
            </p>
            <button className="bg-white text-kesa-blue hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
