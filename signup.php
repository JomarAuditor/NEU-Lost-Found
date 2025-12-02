<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $studentNo = trim($_POST['studentNo']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Basic validation
    if ($password !== $confirmPassword) {
        $_SESSION['error'] = "Passwords do not match.";
        header("Location: student_signup.html");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !str_ends_with($email, '@northeastern.edu')) {
        $_SESSION['error'] = "Please use a valid NEU email (e.g., name@northeastern.edu).";
        header("Location: student_signup.html");
        exit;
    }

    // Hash password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    try {
        // Check if username or email already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $email]);
        if ($stmt->fetch()) {
            $_SESSION['error'] = "Username or email already registered.";
            header("Location: student_signup.html");
            exit;
        }

        // Insert new student
        $stmt = $pdo->prepare("INSERT INTO users (username, email, student_number, password_hash, role) VALUES (?, ?, ?, ?, 'student')");
        $stmt->execute([$username, $email, $studentNo, $passwordHash]);

        $_SESSION['success'] = "Account created successfully! Please log in.";
        header("Location: student_login.html");
        exit;

    } catch (Exception $e) {
        $_SESSION['error'] = "Registration failed. Please try again.";
        header("Location: student_signup.html");
        exit;
    }
} else {
    header("Location: student_signup.html");
    exit;
}
?>