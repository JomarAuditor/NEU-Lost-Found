<?php
session_start();
require_once 'config.php';

// Admin-only access
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header("Location: admin_login.html");
    exit;
}

// Fetch stats
$stmt = $pdo->query("SELECT COUNT(*) FROM lost_items");
$totalItems = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM lost_items WHERE status = 'pending'");
$pending = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM lost_items WHERE status = 'claimed'");
$claimed = $stmt->fetchColumn();

$inStorage = $totalItems - $pending - $claimed;

// Fetch items
$stmt = $pdo->query("SELECT * FROM lost_items ORDER BY created_at DESC LIMIT 10");
$items = $stmt->fetchAll();

// Fetch recent logins
$stmt = $pdo->query("
    SELECT u.username, u.role, l.login_time, l.ip_address 
    FROM login_logs l 
    JOIN users u ON l.user_id = u.id 
    ORDER BY l.login_time DESC 
    LIMIT 10
");
$logins = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEU Lost & Found | Admin Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Northeastern_University_seal.svg/150px-Northeastern_University_seal.svg.png" alt="NEU Logo" width="60">
                <h1>Admin Dashboard</h1>
            </div>
            <nav>
                <span>Admin: <?= htmlspecialchars($_SESSION['username']) ?></span>
                <a href="logout.php">Logout</a>
            </nav>
        </div>
    </header>

    <main class="container">
        <section class="dashboard-header">
            <h3>Lost Item Management System</h3>
            <div class="search-box">
                <input type="text" placeholder="Search items...">
                <button class="btn">Search</button>
            </div>
        </section>

        <section class="stats">
            <div class="stat-card"><h4>Total Items</h4><p class="stat-number"><?= $totalItems ?></p></div>
            <div class="stat-card"><h4>Pending</h4><p class="stat-number"><?= $pending ?></p></div>
            <div class="stat-card"><h4>Claimed</h4><p class="stat-number"><?= $claimed ?></p></div>
            <div class="stat-card"><h4>In Storage</h4><p class="stat-number"><?= $inStorage ?></p></div>
        </section>

        <h4>Recent Login Activity</h4>
        <table class="items-table">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Login Time</th>
                    <th>IP Address</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($logins as $log): ?>
                <tr>
                    <td><?= htmlspecialchars($log['username']) ?></td>
                    <td><?= ucfirst($log['role']) ?></td>
                    <td><?= $log['login_time'] ?></td>
                    <td><?= htmlspecialchars($log['ip_address']) ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <section class="items-table">
            <h4>Reported Items</h4>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Found By</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($items as $item): ?>
                    <tr>
                        <td>LF-2024-<?= str_pad($item['id'], 5, '0', STR_PAD_LEFT) ?></td>
                        <td><?= htmlspecialchars($item['item_name']) ?></td>
                        <td><?= htmlspecialchars($item['found_by_name']) ?><br><?= htmlspecialchars($item['student_number']) ?></td>
                        <td><?= htmlspecialchars($item['location_found']) ?></td>
                        <td><?= $item['date_found'] ?></td>
                        <td><?= ucfirst($item['status']) ?></td>
                        <td>
                            <button class="btn small">View</button>
                            <!-- You can add real "Claimed" button later -->
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </section>

        <section class="quick-actions">
            <h4>Quick Actions</h4>
            <div class="action-buttons">
                <button class="btn">Export Data</button>
                <button class="btn">Print Labels</button>
                <button class="btn danger">Delete Selected</button>
                <button class="btn">Add Manual Entry</button>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>NEU Lost & Found Admin Dashboard | System v2.1</p>
            <p>Last Updated: <?= date('M j, Y g:i A') ?> | Session: Active</p>
            <p>&copy; 2024 Northeastern University</p>
        </div>
    </footer>
</body>
</html>