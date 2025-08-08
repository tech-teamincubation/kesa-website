CREATE TABLE certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    certificate_number VARCHAR(255) UNIQUE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course_banner VARCHAR(255) NOT NULL,
    course_url VARCHAR(255) NOT NULL,
    certificate_file VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
