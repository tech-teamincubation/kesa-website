"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "./components/DashboardLayout"
import { BookOpen, Calendar, Award, User, MessageCircle, Settings } from "lucide-react"

interface DashboardStats {
  registeredSessions: number
  registeredCourses: number
  completedCourses: number
  upcomingEvents: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    registeredSessions: 0,
    registeredCourses: 0,
    completedCourses: 0,
    upcomingEvents: 0,
  })
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      setUser(payload)
      fetchDashboardData(token)
    } catch (error) {
      localStorage.removeItem("token")
      router.push("/auth/login")
    }
  }, [router])

  const fetchDashboardData = async (token: string) => {
    try {
      const response = await fetch("/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Browse Sessions",
      description: "Explore upcoming psychology sessions",
      icon: Calendar,
      href: "/dashboard/sessions",
      color: "bg-blue-500",
    },
    {
      title: "View Courses",
      description: "Check available certification courses",
      icon: BookOpen,
      href: "/dashboard/courses",
      color: "bg-green-500",
    },
    {
      title: "My Registrations",
      description: "View your registered sessions and courses",
      icon: Award,
      href: "/dashboard/registrations",
      color: "bg-purple-500",
    },
    {
      title: "Profile Settings",
      description: "Update your profile information",
      icon: Settings,
      href: "/dashboard/profile",
      color: "bg-orange-500",
    },
  ]

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.email?.split("@")[0] || "User"}!</h1>
          <p className="text-blue-100">Continue your learning journey with KESA's psychology education programs.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Registered Sessions</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.registeredSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Registered Courses</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.registeredCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Courses</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completedCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.upcomingEvents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <a
                  key={index}
                  href={action.href}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className={`inline-flex p-3 rounded-lg ${action.color} text-white mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </a>
              )
            })}
          </div>
        </div>

        {/* Contact Admin */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">Contact our admin team for any questions or support.</p>
            </div>
            <a
              href="https://wa.me/917025000444"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Admin
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
