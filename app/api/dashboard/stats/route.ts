import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any
    const userId = decoded.userId

    const connection = await createConnection()

    // Get registered sessions count
    const [sessionRegistrations] = await connection.execute(
      "SELECT COUNT(*) as count FROM session_registrations WHERE user_id = ?",
      [userId],
    )

    // Get registered courses count
    const [courseRegistrations] = await connection.execute(
      "SELECT COUNT(*) as count FROM course_registrations WHERE user_id = ?",
      [userId],
    )

    // Get completed courses count
    const [completedCourses] = await connection.execute(
      'SELECT COUNT(*) as count FROM course_registrations WHERE user_id = ? AND status = "completed"',
      [userId],
    )

    // Get upcoming events count (sessions in the future)
    const [upcomingEvents] = await connection.execute(
      `SELECT COUNT(*) as count FROM session_registrations sr 
       JOIN sessions s ON sr.session_id = s.id 
       WHERE sr.user_id = ? AND s.date >= CURDATE()`,
      [userId],
    )

    await connection.end()

    const stats = {
      registeredSessions: (sessionRegistrations as any)[0].count,
      registeredCourses: (courseRegistrations as any)[0].count,
      completedCourses: (completedCourses as any)[0].count,
      upcomingEvents: (upcomingEvents as any)[0].count,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
