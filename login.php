<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginId = trim($_POST['loginId']);
    $password = $_POST['password'];

    try {
        // Find user by username OR email
        $stmt = $pdo->prepare("SELECT id, username, email, password_hash, role FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$loginId, $loginId]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            $_SESSION['error'] = "Invalid username/email or password.";
            // Redirect back to correct login page
            if (strpos($_SERVER['HTTP_REFERER'], 'admin_login.html') !== false) {
                header("Location: admin_login.html");
            } else {
                header("Location: student_login.html");
            }
            exit;
        }

        // Log successful login
        $stmt = $pdo->prepare("INSERT INTO login_logs (user_id, ip_address) VALUES (?, ?)");
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $stmt->execute([$user['id'], $ip]);

        // Set session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        // Redirect based on role
        if ($user['role'] === 'admin') {
            header("Location: admin_dashboard.php");
        } else {
            header("Location: lost_item_found.html");
        }
        exit;

    } catch (Exception $e) {
        $_SESSION['error'] = "Login failed. Please try again.";
        header("Location: student_login.html");
        exit;
    }
} else {
    header("Location: index.html");
    exit;
}
?>