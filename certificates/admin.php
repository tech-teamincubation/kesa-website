<?php
require 'config.php';

if (!isset($_SESSION['logged_in'])) {
    header('Location: login.php');
    exit;
}

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student = $_POST['student_name'] ?? '';
    $certno = $_POST['certificate_number'] ?? '';
    $course_url = $_POST['course_url'] ?? '';

    // Upload banner
    $banner_path = '';
    if (!empty($_FILES['course_banner']['name'])) {
        $banner_path = 'uploads/' . basename($_FILES['course_banner']['name']);
        move_uploaded_file($_FILES['course_banner']['tmp_name'], __DIR__ . '/' . $banner_path);
    }

    // Upload certificate file
    $cert_path = '';
    if (!empty($_FILES['certificate_file']['name'])) {
        $cert_path = 'uploads/' . basename($_FILES['certificate_file']['name']);
        move_uploaded_file($_FILES['certificate_file']['tmp_name'], __DIR__ . '/' . $cert_path);
    }

    if ($student && $certno && $course_url && $banner_path && $cert_path) {
        $stmt = $pdo->prepare("INSERT INTO certificates (certificate_number, student_name, course_banner, course_url, certificate_file) VALUES (?,?,?,?,?)");
        $stmt->execute([$certno, $student, $banner_path, $course_url, $cert_path]);
        $message = 'Certificate uploaded successfully.';
    } else {
        $message = 'All fields are required.';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - KESA Learning</title>
</head>
<body>
<h2>Upload Certificate</h2>
<p><a href="logout.php">Logout</a></p>
<?php if ($message) echo '<p>' . htmlspecialchars($message) . '</p>'; ?>
<form method="post" enctype="multipart/form-data">
    <label>Student Name: <input type="text" name="student_name" required></label><br>
    <label>Certificate Number: <input type="text" name="certificate_number" required></label><br>
    <label>Course Banner: <input type="file" name="course_banner" accept="image/*" required></label><br>
    <label>Course URL: <input type="url" name="course_url" required></label><br>
    <label>Certificate File: <input type="file" name="certificate_file" accept="application/pdf" required></label><br>
    <button type="submit">Upload</button>
</form>
</body>
</html>
