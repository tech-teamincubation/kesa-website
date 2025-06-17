"use client"

import { useState, useEffect } from "react"
import { Award, Clock } from "lucide-react"

interface Course {
  id: number
  title: string
  description: string
  duration: string
  level: string
  price: string
  image: string
  registrationLink: string
  features: string[]
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // Sample data - in real app, this would come from API
    const sampleCourses: Course[] = [
      {
        id: 1,
        title: "Clinical Case History Taking and MSE",
        description:
          "Comprehensive course covering clinical interview techniques, case history documentation, and mental status examination procedures.",
        duration: "6 weeks",
        level: "Intermediate",
        price: "₹4,999",
        image: "/placeholder.svg?height=250&width=400",
        registrationLink: "#",
        features: [
          "Interactive case studies",
          "Practical assessment tools",
          "Expert supervision",
          "Certificate of completion",
        ],
      },
      {
        id: 2,
        title: "Psychology Coaching Basics",
        description:
          "Learn the fundamentals of psychology coaching, including client rapport building, goal setting, and intervention strategies.",
        duration: "4 weeks",
        level: "Beginner",
        price: "₹3,499",
        image: "/placeholder.svg?height=250&width=400",
        registrationLink: "#",
        features: ["Coaching methodologies", "Communication skills", "Ethical guidelines", "Practice sessions"],
      },
      {
        id: 3,
        title: "Advanced Therapeutic Techniques",
        description:
          "Explore advanced therapeutic interventions including CBT, DBT, and mindfulness-based approaches for various psychological conditions.",
        duration: "8 weeks",
        level: "Advanced",
        price: "₹6,999",
        image: "/placeholder.svg?height=250&width=400",
        registrationLink: "#",
        features: [
          "Multiple therapy modalities",
          "Case conceptualization",
          "Treatment planning",
          "Supervision included",
        ],
      },
    ]
    setCourses(sampleCourses)
  }, [])

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">SkillUp Certification Courses</h2>
          <div className="w-24 h-1 bg-kesa-blue mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our SkillUp certification courses in psychology and education. Designed by experts to provide
            comprehensive knowledge and practical skills for professional growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : course.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="mr-2" size={16} />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="text-2xl font-bold text-kesa-blue">{course.price}</div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                  <ul className="space-y-1">
                    {course.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Award className="mr-2 text-blue-600" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-gradient-to-r from-kesa-blue to-kesa-purple hover:from-kesa-purple hover:to-kesa-blue text-white font-semibold py-3 px-6 rounded-lg transition-all">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-kesa-blue text-kesa-blue hover:bg-kesa-blue hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  )
}
