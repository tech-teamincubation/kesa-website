import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, whatsapp, dateOfBirth, gender, city, password } = body

    // Validate required fields
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const connection = await createConnection()

    // Check if user already exists
    const [existingUsers] = await connection.execute("SELECT id FROM users WHERE email = ?", [email])

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      await connection.end()
      return NextResponse.json({ message: "User already exists with this email" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Insert new user
    const [result] = await connection.execute(
      `INSERT INTO users (full_name, email, phone, whatsapp, date_of_birth, gender, city, password, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [fullName, email, phone, whatsapp, dateOfBirth, gender, city, hashedPassword],
    )

    await connection.end()

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
