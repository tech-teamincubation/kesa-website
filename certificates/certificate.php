<?php
require 'config.php';

$certno = $_GET['cert'] ?? '';
$stmt = $pdo->prepare('SELECT * FROM certificates WHERE certificate_number = ?');
$stmt->execute([$certno]);
$cert = $stmt->fetch();

if (!$cert) {
    http_response_code(404);
    echo 'Certificate not found';
    exit;
}

$page_url = 'https://kesalearn.com/certificate.php?cert=' . urlencode($certno);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Certificate Verification - KESA Learning</title>
</head>
<body>
    <h2>Certificate Verification</h2>
    <img src="<?= htmlspecialchars($cert['course_banner']) ?>" alt="Course Banner" style="max-width:400px;">
    <p>Student: <?= htmlspecialchars($cert['student_name']) ?></p>
    <p>Certificate Number: <?= htmlspecialchars($cert['certificate_number']) ?></p>
    <p><a href="<?= htmlspecialchars($cert['course_url']) ?>">Course Link</a></p>
    <p><a href="<?= htmlspecialchars($cert['certificate_file']) ?>" download>Download Certificate</a></p>
    <div>
        <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?= urlencode($page_url) ?>">Share on Facebook</a>
        <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=<?= urlencode($page_url) ?>">Share on LinkedIn</a>
        <a target="_blank" href="https://www.instagram.com/?url=<?= urlencode($page_url) ?>">Share on Instagram</a>
    </div>
</body>
</html>
