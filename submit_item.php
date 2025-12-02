<?php
session_start();
require_once 'config.php';

// Simple auth check (you can enhance later)
if (!isset($_SESSION['user_id'])) {
    die("Access denied. Please log in.");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $itemName = trim($_POST['itemName']);
    $quantity = (int)$_POST['quantity'];
    $category = $_POST['category'] ?? '';
    $description = trim($_POST['description']);
    $location = trim($_POST['location']);
    $dateFound = $_POST['dateFound'];
    $timeFound = $_POST['timeFound'];
    $building = trim($_POST['building']) ?: NULL;
    $foundByName = trim($_POST['foundByName']);
    $studentNo = trim($_POST['studentNo']);
    $notes = trim($_POST['notes']) ?: NULL;

    try {
        $stmt = $pdo->prepare("INSERT INTO lost_items (
            item_name, quantity, category, description, location_found,
            date_found, time_found, building, found_by_name, student_number, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $stmt->execute([
            $itemName, $quantity, $category, $description, $location,
            $dateFound, $timeFound, $building, $foundByName, $studentNo, $notes
        ]);

        $_SESSION['success'] = "Item reported successfully!";
        header("Location: lost_item_found.html");
        exit;

    } catch (Exception $e) {
        $_SESSION['error'] = "Failed to submit item. Please try again.";
        header("Location: lost_item_found.html");
        exit;
    }
} else {
    header("Location: lost_item_found.html");
    exit;
}
?>