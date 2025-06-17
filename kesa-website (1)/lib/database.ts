import mysql from "mysql2/promise"

export async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kesa_db",
    port: Number.parseInt(process.env.DB_PORT || "3306"),
  })

  return connection
}

export async function initializeDatabase() {
  const connection = await createConnection()

  try {
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        whatsapp VARCHAR(20),
        date_of_birth DATE,
        gender ENUM('male', 'female', 'other'),
        city VARCHAR(100),
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        profile_photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create sessions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        time TIME NOT NULL,
        fee DECIMAL(10, 2) NOT NULL,
        mode ENUM('online', 'offline') NOT NULL,
        banner VARCHAR(255),
        registration_link VARCHAR(500),
        max_participants INT DEFAULT 50,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create courses table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        duration VARCHAR(50),
        level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255),
        registration_link VARCHAR(500),
        features JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create session registrations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS session_registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        session_id INT NOT NULL,
        payment_screenshot VARCHAR(255),
        payment_date DATE,
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_session (user_id, session_id)
      )
    `)

    // Create course registrations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS course_registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        payment_screenshot VARCHAR(255),
        payment_date DATE,
        status ENUM('pending', 'confirmed', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_course (user_id, course_id)
      )
    `)

    // Create achievements table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        completed_sessions INT DEFAULT 43,
        years_of_excellence INT DEFAULT 3,
        total_participants INT DEFAULT 2000,
        resource_persons INT DEFAULT 25,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create site settings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Insert default admin user
    const adminEmail = "admin@kesalearn.com"
    const adminPassword = await require("bcryptjs").hash("admin123", 12)

    await connection.execute(
      `
      INSERT IGNORE INTO users (full_name, email, phone, password, role) 
      VALUES (?, ?, ?, ?, ?)
    `,
      ["KESA Admin", adminEmail, "+917025000444", adminPassword, "admin"],
    )

    // Insert sample data
    await connection.execute(`
      INSERT IGNORE INTO achievements (id, completed_sessions, years_of_excellence, total_participants, resource_persons) 
      VALUES (1, 43, 3, 2000, 25)
    `)

    // Insert sample sessions
    await connection.execute(`
      INSERT IGNORE INTO sessions (id, title, description, date, time, fee, mode, registration_link) VALUES
      (1, 'Clinical Case History Taking and MSE', 'Learn comprehensive techniques for clinical case history taking and mental status examination.', '2024-02-15', '10:00:00', 999.00, 'online', '#'),
      (2, 'Psychology Coaching Basics', 'Master the fundamentals of psychology coaching and client interaction.', '2024-02-20', '14:00:00', 799.00, 'offline', '#'),
      (3, 'Cognitive Behavioral Therapy Techniques', 'Explore advanced CBT techniques for effective therapeutic interventions.', '2024-02-25', '11:00:00', 1299.00, 'online', '#')
    `)

    // Insert sample courses
    await connection.execute(`
      INSERT IGNORE INTO courses (id, title, description, duration, level, price, registration_link, features) VALUES
      (1, 'Clinical Case History Taking and MSE', 'Comprehensive course covering clinical interview techniques, case history documentation, and mental status examination procedures.', '6 weeks', 'intermediate', 4999.00, '#', '["Interactive case studies", "Practical assessment tools", "Expert supervision", "Certificate of completion"]'),
      (2, 'Psychology Coaching Basics', 'Learn the fundamentals of psychology coaching, including client rapport building, goal setting, and intervention strategies.', '4 weeks', 'beginner', 3499.00, '#', '["Coaching methodologies", "Communication skills", "Ethical guidelines", "Practice sessions"]'),
      (3, 'Advanced Therapeutic Techniques', 'Explore advanced therapeutic interventions including CBT, DBT, and mindfulness-based approaches for various psychological conditions.', '8 weeks', 'advanced', 6999.00, '#', '["Multiple therapy modalities", "Case conceptualization", "Treatment planning", "Supervision included"]')
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
    throw error
  } finally {
    await connection.end()
  }
}
