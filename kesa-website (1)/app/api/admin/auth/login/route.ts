import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const connection = await createConnection()

    // Find admin user by email
    const [users] = await connection.execute(
      'SELECT id, email, password, full_name, role FROM users WHERE email = ? AND role = "admin"',
      [email],
    )

    await connection.end()

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 })
    }

    const user = users[0] as any

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: "admin",
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: "admin",
      },
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
