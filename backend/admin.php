<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
require_once 'config.php';

// Handle Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit();
}

// Handle Login
$login_error = '';
if (isset($_POST['login'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute([$user]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($pass, $admin['password_hash'])) {
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_name'] = $admin['full_name'];
        header("Location: admin.php");
        exit();
    } else {
        $login_error = 'Invalid username or password.';
    }
}

// Check Authentication
if (!isset($_SESSION['admin_id'])) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login — Apex Admin</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Outfit', sans-serif; background: #030812; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
            .login-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 40px; border-radius: 24px; width: 100%; max-width: 400px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); backdrop-filter: blur(20px); }
            h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; text-align: center; }
            h2 span { background: linear-gradient(90deg, #fb923c, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            p { color: #94a3b8; text-align: center; font-size: 0.9rem; margin-bottom: 32px; }
            .form-group { margin-bottom: 20px; }
            label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #f97316; margin-bottom: 8px; }
            input { width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-family: inherit; outline: none; transition: all 0.2s; }
            input:focus { border-color: #f97316; background: rgba(255,255,255,0.08); }
            .btn-login { width: 100%; padding: 14px; background: linear-gradient(135deg, #f97316, #ea580c); border: none; border-radius: 12px; color: #fff; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 10px; }
            .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(249,115,22,0.4); }
            .error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #f87171; padding: 12px; border-radius: 10px; font-size: 0.85rem; margin-bottom: 20px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="login-card">
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 8px 20px rgba(249,115,22,0.3);">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #fff;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <h2>Apex <span>Admin</span></h2>
                <p>Enter your credentials to access the dashboard</p>
            </div>
            
            <?php if ($login_error): ?>
                <div class="error"><?= $login_error ?></div>
            <?php endif; ?>

            <form method="POST">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="username" required autofocus placeholder="admin">
                </div>
                <div class="form-group" style="margin-bottom: 28px;">
                    <label>Password</label>
                    <input type="password" name="password" required placeholder="••••••••">
                </div>
                <button type="submit" name="login" class="btn-login">Sign In to Dashboard</button>
            </form>
            
            <div style="margin-top: 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px;">
                <a href="/" style="color: #94a3b8; text-decoration: none; font-size: 0.85rem; transition: color 0.2s;" onMouseEnter="this.style.color='#f97316'" onMouseLeave="this.style.color='#94a3b8'">
                    ← Back to Website
                </a>
            </div>
        </div>
    </body>
    </html>
    <?php
    exit();
}

// Handle delete action
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM contact_inquiries WHERE id = :id");
    $stmt->execute([':id' => (int) $_GET['delete']]);
    header("Location: admin.php?tab=inquiries&msg=deleted");
    exit();
}

// Handle mark as read
if (isset($_GET['read']) && is_numeric($_GET['read'])) {
    $stmt = $pdo->prepare("UPDATE contact_inquiries SET is_read = 1 WHERE id = :id");
    $stmt->execute([':id' => (int) $_GET['read']]);
    header("Location: admin.php?tab=inquiries&msg=read");
    exit();
}

// Handle mark as unread
if (isset($_GET['unread']) && is_numeric($_GET['unread'])) {
    $stmt = $pdo->prepare("UPDATE contact_inquiries SET is_read = 0 WHERE id = :id");
    $stmt->execute([':id' => (int) $_GET['unread']]);
    header("Location: admin.php?tab=inquiries&msg=unread");
    exit();
}

// --- NEW: Handle Settings Update ---
if (isset($_POST['update_settings'])) {
    foreach ($_POST['settings'] as $key => $value) {
        $stmt = $pdo->prepare("UPDATE site_settings SET setting_value = :val WHERE setting_key = :key");
        $stmt->execute([':val' => $value, ':key' => $key]);
    }
    header("Location: admin.php?tab=settings&msg=updated");
    exit();
}

// --- NEW: Handle Service Management ---
if (isset($_POST['save_service'])) {
    $name = $_POST['service_name'];
    $desc = $_POST['service_desc'];
    $img = $_POST['service_img'];
    $id = $_POST['service_id'] ?? null;

    if ($id) {
        $stmt = $pdo->prepare("UPDATE services SET name = ?, description = ?, image_url = ? WHERE id = ?");
        $stmt->execute([$name, $desc, $img, $id]);
        $msg = "service_updated";
    } else {
        $stmt = $pdo->prepare("INSERT INTO services (name, description, image_url) VALUES (?, ?, ?)");
        $stmt->execute([$name, $desc, $img]);
        $msg = "service_added";
    }
    header("Location: admin.php?tab=services&msg=$msg");
    exit();
}

if (isset($_GET['delete_service']) && is_numeric($_GET['delete_service'])) {
    $stmt = $pdo->prepare("DELETE FROM services WHERE id = :id");
    $stmt->execute([':id' => (int) $_GET['delete_service']]);
    header("Location: admin.php?tab=services&msg=service_deleted");
    exit();
}

// Tab logic
$tab = $_GET['tab'] ?? 'inquiries';

// Fetch filter for inquiries
$filter = $_GET['filter'] ?? 'all';
$search = trim($_GET['search'] ?? '');

$sql = "SELECT * FROM contact_inquiries";
$params = [];

$conditions = [];
if ($filter === 'unread') {
    $conditions[] = "is_read = 0";
} elseif ($filter === 'read') {
    $conditions[] = "is_read = 1";
}

if (!empty($search)) {
    $conditions[] = "(full_name LIKE :search OR phone_number LIKE :search2 OR email LIKE :search3 OR project_type LIKE :search4 OR location LIKE :search5)";
    $params[':search'] = "%$search%";
    $params[':search2'] = "%$search%";
    $params[':search3'] = "%$search%";
    $params[':search4'] = "%$search%";
    $params[':search5'] = "%$search%";
}

if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$sql .= " ORDER BY submitted_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$inquiries = $stmt->fetchAll();

// Fetch Services
$services = $pdo->query("SELECT * FROM services ORDER BY display_order ASC, name ASC")->fetchAll();

// Fetch Settings
$settingsRows = $pdo->query("SELECT * FROM site_settings ORDER BY category, label")->fetchAll();
$settings = [];
foreach ($settingsRows as $row) {
    $settings[$row['category']][] = $row;
}

// Stats
$totalStmt = $pdo->query("SELECT COUNT(*) FROM contact_inquiries");
$totalCount = $totalStmt->fetchColumn();

$unreadStmt = $pdo->query("SELECT COUNT(*) FROM contact_inquiries WHERE is_read = 0");
$unreadCount = $unreadStmt->fetchColumn();

$todayStmt = $pdo->query("SELECT COUNT(*) FROM contact_inquiries WHERE DATE(submitted_at) = CURDATE()");
$todayCount = $todayStmt->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel — Apex Structure Consultants</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <style>
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background: #030812;
            color: #e2e8f0;
            min-height: 100vh;
        }

        /* ─── Scrollbar ─── */
        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-track {
            background: #030812;
        }

        ::-webkit-scrollbar-thumb {
            background: #f97316;
            border-radius: 3px;
        }

        /* ─── Layout ─── */
        .admin-wrapper {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 24px;
        }

        /* ─── Header ─── */
        .admin-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 36px;
        }

        .admin-title {
            font-size: 2rem;
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.5px;
        }

        .admin-title span {
            background: linear-gradient(90deg, #fb923c, #fbbf24);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .admin-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #fb923c;
            background: rgba(249, 115, 22, 0.08);
            border: 1px solid rgba(249, 115, 22, 0.2);
        }

        /* ─── Stats Cards ─── */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            border-color: rgba(249, 115, 22, 0.3);
            transform: translateY(-2px);
        }

        .stat-label {
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            margin-bottom: 8px;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: #fff;
        }

        .stat-value.orange {
            color: #fb923c;
        }

        .stat-value.green {
            color: #4ade80;
        }

        .stat-value.blue {
            color: #60a5fa;
        }

        /* ─── Toolbar ─── */
        .toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
        }

        .filter-tabs {
            display: flex;
            gap: 8px;
        }

        .filter-tab {
            padding: 8px 18px;
            border-radius: 10px;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            color: #94a3b8;
        }

        .filter-tab:hover,
        .filter-tab.active {
            background: rgba(249, 115, 22, 0.12);
            border-color: rgba(249, 115, 22, 0.3);
            color: #fb923c;
        }

        .search-box {
            display: flex;
            gap: 8px;
        }

        .search-box input {
            padding: 10px 16px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.04);
            color: #fff;
            font-size: 0.85rem;
            font-family: 'Outfit', sans-serif;
            outline: none;
            width: 260px;
            transition: border-color 0.2s;
        }

        .search-box input:focus {
            border-color: rgba(249, 115, 22, 0.4);
        }

        .search-box input::placeholder {
            color: #64748b;
        }

        .search-box button {
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: #fff;
            font-size: 0.82rem;
            font-weight: 600;
            font-family: 'Outfit', sans-serif;
            cursor: pointer;
            transition: all 0.2s;
        }

        .search-box button:hover {
            transform: scale(1.03);
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
        }

        /* ─── Table ─── */
        .table-wrapper {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            overflow: hidden;
        }

        .table-scroll {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
        }

        thead {
            background: rgba(255, 255, 255, 0.04);
        }

        th {
            padding: 16px 20px;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #94a3b8;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            white-space: nowrap;
        }

        td {
            padding: 16px 20px;
            font-size: 0.88rem;
            color: #cbd5e1;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            vertical-align: top;
        }

        tr {
            transition: background 0.2s;
        }

        tr:hover {
            background: rgba(249, 115, 22, 0.03);
        }

        tr.unread {
            background: rgba(249, 115, 22, 0.04);
            border-left: 3px solid #f97316;
        }

        tr.unread td:first-child {
            padding-left: 17px;
        }

        .name-cell {
            font-weight: 700;
            color: #fff;
        }

        .unread .name-cell::after {
            content: 'NEW';
            display: inline-block;
            margin-left: 8px;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            background: rgba(249, 115, 22, 0.15);
            color: #fb923c;
            border: 1px solid rgba(249, 115, 22, 0.3);
        }

        .message-cell {
            max-width: 280px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #94a3b8;
            font-size: 0.82rem;
        }

        .time-cell {
            font-size: 0.78rem;
            color: #64748b;
            white-space: nowrap;
        }

        /* ─── Action Buttons ─── */
        .action-btns {
            display: flex;
            gap: 6px;
            white-space: nowrap;
        }

        .btn-action {
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.72rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            cursor: pointer;
            border: none;
            font-family: 'Outfit', sans-serif;
        }

        .btn-read {
            background: rgba(34, 197, 94, 0.08);
            border: 1px solid rgba(34, 197, 94, 0.25);
            color: #4ade80;
        }

        .btn-read:hover {
            background: rgba(34, 197, 94, 0.18);
        }

        .btn-unread {
            background: rgba(96, 165, 250, 0.08);
            border: 1px solid rgba(96, 165, 250, 0.25);
            color: #60a5fa;
        }

        .btn-unread:hover {
            background: rgba(96, 165, 250, 0.18);
        }

        .btn-delete {
            background: rgba(239, 68, 68, 0.08);
            border: 1px solid rgba(239, 68, 68, 0.25);
            color: #f87171;
        }

        .btn-delete:hover {
            background: rgba(239, 68, 68, 0.18);
        }

        .btn-view {
            background: rgba(249, 115, 22, 0.08);
            border: 1px solid rgba(249, 115, 22, 0.25);
            color: #fb923c;
        }

        .btn-view:hover {
            background: rgba(249, 115, 22, 0.18);
        }

        /* ─── Empty State ─── */
        .empty-state {
            text-align: center;
            padding: 80px 20px;
        }

        .empty-state h3 {
            font-size: 1.3rem;
            color: #fff;
            margin-bottom: 8px;
        }

        .empty-state p {
            color: #64748b;
            font-size: 0.9rem;
        }

        /* ─── Toast Notification ─── */
        .toast {
            position: fixed;
            top: 24px;
            right: 24px;
            padding: 14px 24px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 600;
            z-index: 999;
            animation: slideIn 0.4s ease, fadeOut 0.4s ease 2.6s forwards;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #4ade80;
        }

        .toast.delete {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #f87171;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }

            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }

        /* ─── Modal ─── */
        .modal-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal-overlay.active {
            display: flex;
        }

        .modal {
            background: #0a1628;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 36px;
            max-width: 560px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: modalIn 0.3s ease;
        }

        @keyframes modalIn {
            from {
                transform: scale(0.9);
                opacity: 0;
            }

            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        .modal h2 {
            font-size: 1.4rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 24px;
        }

        .modal h2 span {
            color: #fb923c;
        }

        .modal-field {
            margin-bottom: 16px;
        }

        .modal-field label {
            display: block;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #f97316;
            margin-bottom: 4px;
        }

        .modal-field p {
            font-size: 0.92rem;
            color: #cbd5e1;
            padding: 10px 14px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 10px;
            word-wrap: break-word;
        }

        .modal-close {
            margin-top: 20px;
            padding: 10px 28px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Outfit', sans-serif;
            transition: all 0.2s;
        }

        .modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* ─── Navigation Tabs ─── */
        .admin-nav {
            display: flex;
            gap: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            margin-bottom: 32px;
        }

        .nav-item {
            padding: 12px 4px;
            font-size: 0.9rem;
            font-weight: 600;
            color: #94a3b8;
            text-decoration: none;
            position: relative;
            transition: all 0.2s;
        }

        .nav-item:hover {
            color: #fff;
        }

        .nav-item.active {
            color: #fb923c;
        }

        .nav-item.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #fb923c;
            box-shadow: 0 -2px 10px rgba(249, 115, 22, 0.5);
        }

        /* ─── Forms ─── */
        .admin-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            padding: 32px;
            margin-bottom: 24px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-group label {
            display: block;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #f97316;
            margin-bottom: 8px;
        }

        .form-control {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            font-size: 0.9rem;
            transition: all 0.2s;
        }

        .form-control:focus {
            outline: none;
            border-color: rgba(249, 115, 22, 0.4);
            background: rgba(255, 255, 255, 0.06);
        }

        .btn-submit {
            padding: 12px 32px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            border: none;
            border-radius: 12px;
            color: #fff;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
        }

        /* ─── Services Grid ─── */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }

        .service-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .service-card:hover {
            border-color: rgba(249, 115, 22, 0.3);
            transform: translateY(-4px);
        }

        .service-img {
            width: 100%;
            height: 160px;
            object-fit: cover;
            background: #0f172a;
        }

        .service-info {
            padding: 20px;
        }

        .service-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 8px;
        }

        .service-desc {
            font-size: 0.85rem;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .service-actions {
            display: flex;
            gap: 10px;
        }

        /* ─── Utility ─── */
        .flex-between {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        @media (max-width: 768px) {
            .admin-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .toolbar {
                flex-direction: column;
                align-items: stretch;
            }

            .search-box {
                width: 100%;
            }

            .search-box input {
                width: 100%;
            }

            .admin-title {
                font-size: 1.5rem;
            }

            .admin-nav {
                gap: 16px;
                overflow-x: auto;
                padding-bottom: 8px;
            }
        }

        .user-nav {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .user-info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .user-name {
            font-size: 0.9rem;
            font-weight: 700;
            color: #fff;
        }

        .user-role {
            font-size: 0.7rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .btn-logout {
            padding: 10px 18px;
            border-radius: 12px;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: #f87171;
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 600;
            transition: all 0.2s;
        }

        .btn-logout:hover {
            background: rgba(239, 68, 68, 0.2);
            transform: translateY(-2px);
        }
    </style>
</head>

<body>
    <?php if (isset($_GET['msg'])): ?>
        <div class="toast <?= in_array($_GET['msg'], ['deleted', 'service_deleted']) ? 'delete' : '' ?>">
            <?php
            $messages = [
                'deleted' => '🗑️ Inquiry deleted successfully.',
                'read' => '✅ Marked as read.',
                'unread' => '📩 Marked as unread.',
                'updated' => '✨ Settings updated successfully.',
                'service_added' => '🚀 Service added successfully.',
                'service_updated' => '📝 Service updated successfully.',
                'service_deleted' => '🗑️ Service removed.',
            ];
            echo $messages[$_GET['msg']] ?? 'Action completed.';
            ?>
        </div>
    <?php endif; ?>

    <div class="admin-wrapper">
        <!-- Header -->
        <div class="admin-header">
            <div>
                <span class="admin-badge">🏗️ Admin Panel</span>
                <h1 class="admin-title" style="margin-top: 12px">Apex Structure <span>Management</span></h1>
            </div>
            <div class="user-nav">
                <div class="user-info">
                    <span class="user-name"><?= htmlspecialchars($_SESSION['admin_name']) ?></span>
                    <span class="user-role">Administrator</span>
                </div>
                <a href="admin.php?logout=1" class="btn-logout" onclick="return confirm('Are you sure you want to log out?')">Log Out</a>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="admin-nav">
            <a href="admin.php?tab=inquiries" class="nav-item <?= $tab === 'inquiries' ? 'active' : '' ?>">Inquiries</a>
            <a href="admin.php?tab=services" class="nav-item <?= $tab === 'services' ? 'active' : '' ?>">Services</a>
            <a href="admin.php?tab=settings" class="nav-item <?= $tab === 'settings' ? 'active' : '' ?>">Site Settings</a>
        </nav>

        <?php if ($tab === 'inquiries'): ?>
            <!-- Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Inquiries</div>
                    <div class="stat-value orange"><?= $totalCount ?></div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Unread</div>
                    <div class="stat-value green"><?= $unreadCount ?></div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Today</div>
                    <div class="stat-value blue"><?= $todayCount ?></div>
                </div>
            </div>

            <!-- Toolbar -->
            <div class="toolbar">
                <div class="filter-tabs">
                    <a href="admin.php?tab=inquiries" class="filter-tab <?= $filter === 'all' ? 'active' : '' ?>">All</a>
                    <a href="admin.php?tab=inquiries&filter=unread"
                        class="filter-tab <?= $filter === 'unread' ? 'active' : '' ?>">Unread</a>
                    <a href="admin.php?tab=inquiries&filter=read"
                        class="filter-tab <?= $filter === 'read' ? 'active' : '' ?>">Read</a>
                </div>
                <form class="search-box" method="GET" action="admin.php">
                    <input type="hidden" name="tab" value="inquiries">
                    <input type="hidden" name="filter" value="<?= htmlspecialchars($filter) ?>">
                    <input type="text" name="search" placeholder="Search by name, phone, email..."
                        value="<?= htmlspecialchars($search) ?>">
                    <button type="submit">Search</button>
                </form>
            </div>

            <!-- Table -->
            <div class="table-wrapper">
                <?php if (empty($inquiries)): ?>
                    <div class="empty-state">
                        <h3>No inquiries found</h3>
                        <p>Contact form submissions will appear here.</p>
                    </div>
                <?php else: ?>
                    <div class="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Project</th>
                                    <th>Location</th>
                                    <th>Budget</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($inquiries as $row): ?>
                                    <tr class="<?= $row['is_read'] ? '' : 'unread' ?>">
                                        <td style="color: #64748b; font-size: 0.8rem"><?= $row['id'] ?></td>
                                        <td class="name-cell"><?= htmlspecialchars($row['full_name']) ?></td>
                                        <td><?= htmlspecialchars($row['phone_number']) ?></td>
                                        <td><?= htmlspecialchars($row['email'] ?: '—') ?></td>
                                        <td><?= htmlspecialchars($row['project_type'] ?: '—') ?></td>
                                        <td><?= htmlspecialchars($row['location'] ?: '—') ?></td>
                                        <td><?= htmlspecialchars($row['budget_range'] ?: '—') ?></td>
                                        <td class="message-cell" title="<?= htmlspecialchars($row['message'] ?: '') ?>">
                                            <?= htmlspecialchars($row['message'] ?: '—') ?>
                                        </td>
                                        <td class="time-cell"><?= date('d M Y, h:i A', strtotime($row['submitted_at'])) ?></td>
                                        <td>
                                            <div class="action-btns">
                                                <button class="btn-action btn-view"
                                                    onclick="showDetail(<?= htmlspecialchars(json_encode($row)) ?>)">View</button>
                                                <?php if ($row['is_read']): ?>
                                                    <a href="admin.php?tab=inquiries&unread=<?= $row['id'] ?>"
                                                        class="btn-action btn-unread">Unread</a>
                                                <?php else: ?>
                                                    <a href="admin.php?tab=inquiries&read=<?= $row['id'] ?>"
                                                        class="btn-action btn-read">Read</a>
                                                <?php endif; ?>
                                                <a href="admin.php?tab=inquiries&delete=<?= $row['id'] ?>"
                                                    class="btn-action btn-delete"
                                                    onclick="return confirm('Are you sure you want to delete this inquiry?')">Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php endif; ?>
            </div>

        <?php elseif ($tab === 'services'): ?>
            <div class="flex-between">
                <h2 style="font-size: 1.5rem">Manage Services</h2>
                <button class="btn-submit" onclick="showServiceModal()">+ Add New Service</button>
            </div>

            <div class="services-grid">
                <?php foreach ($services as $svc): ?>
                    <div class="service-card">
                        <?php if ($svc['image_url']): ?>
                            <img src="<?= htmlspecialchars($svc['image_url']) ?>" class="service-img" alt="">
                        <?php else: ?>
                            <div class="service-img"
                                style="display: flex; align-items: center; justify-content: center; color: #334155; font-size: 2rem">
                                🏗️</div>
                        <?php endif; ?>
                        <div class="service-info">
                            <h3 class="service-name"><?= htmlspecialchars($svc['name']) ?></h3>
                            <p class="service-desc"><?= htmlspecialchars($svc['description']) ?></p>
                            <div class="service-actions">
                                <button class="btn-action btn-view"
                                    onclick="showServiceModal(<?= htmlspecialchars(json_encode($svc)) ?>)">Edit</button>
                                <a href="admin.php?tab=services&delete_service=<?= $svc['id'] ?>" class="btn-action btn-delete"
                                    onclick="return confirm('Delete this service?')">Delete</a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

        <?php elseif ($tab === 'settings'): ?>
            <h2 style="font-size: 1.5rem; margin-bottom: 24px">Site Settings</h2>
            <form action="admin.php?tab=settings" method="POST">
                <?php foreach ($settings as $category => $rows): ?>
                    <div class="admin-card">
                        <h3
                            style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px">
                            <?= ucfirst($category) ?> Information</h3>
                        <?php foreach ($rows as $s): ?>
                            <div class="form-group">
                                <label><?= htmlspecialchars($s['label']) ?></label>
                                <input type="text" name="settings[<?= htmlspecialchars($s['setting_key']) ?>]"
                                    value="<?= htmlspecialchars($s['setting_value']) ?>" class="form-control">
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endforeach; ?>
                <button type="submit" name="update_settings" class="btn-submit">Save All Settings</button>
            </form>
        <?php endif; ?>
    </div>

    <!-- Detail Modal -->
    <div class="modal-overlay" id="detailModal">
        <div class="modal">
            <h2>Inquiry <span>Details</span></h2>
            <div id="modalContent"></div>
            <button class="modal-close" onclick="closeModal()">Close</button>
        </div>
    </div>

    <!-- Service Modal -->
    <div class="modal-overlay" id="serviceModal">
        <div class="modal">
            <h2 id="svcModalTitle">Add <span>Service</span></h2>
            <form action="admin.php?tab=services" method="POST">
                <input type="hidden" name="service_id" id="svc_id">
                <div class="form-group">
                    <label>Service Name</label>
                    <input type="text" name="service_name" id="svc_name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="service_desc" id="svc_desc" class="form-control" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label>Image URL</label>
                    <input type="text" name="service_img" id="svc_img" class="form-control"
                        placeholder="https://images.unsplash.com/...">
                </div>
                <div style="display: flex; gap: 12px; margin-top: 24px">
                    <button type="submit" name="save_service" class="btn-submit">Save Service</button>
                    <button type="button" class="modal-close" style="margin-top:0"
                        onclick="closeSvcModal()">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        function showDetail(data) {
            const fields = [
                ['Full Name', data.full_name],
                ['Phone Number', data.phone_number],
                ['Email', data.email || '—'],
                ['Project Type', data.project_type || '—'],
                ['Location', data.location || '—'],
                ['Budget Range', data.budget_range || '—'],
                ['Message', data.message || '—'],
                ['Submitted At', data.submitted_at],
                ['Status', data.is_read == 1 ? '✅ Read' : '📩 Unread'],
            ];

            let html = '';
            fields.forEach(([label, value]) => {
                html += `
                    <div class="modal-field">
                        <label>${label}</label>
                        <p>${escapeHtml(value)}</p>
                    </div>
                `;
            });

            document.getElementById('modalContent').innerHTML = html;
            document.getElementById('detailModal').classList.add('active');

            // Mark as read automatically
            if (data.is_read == 0) {
                fetch('admin.php?tab=inquiries&read=' + data.id);
            }
        }

        function showServiceModal(data = null) {
            if (data) {
                document.getElementById('svcModalTitle').innerHTML = 'Edit <span>Service</span>';
                document.getElementById('svc_id').value = data.id;
                document.getElementById('svc_name').value = data.name;
                document.getElementById('svc_desc').value = data.description;
                document.getElementById('svc_img').value = data.image_url;
            } else {
                document.getElementById('svcModalTitle').innerHTML = 'Add <span>Service</span>';
                document.getElementById('svc_id').value = '';
                document.getElementById('svc_name').value = '';
                document.getElementById('svc_desc').value = '';
                document.getElementById('svc_img').value = '';
            }
            document.getElementById('serviceModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('detailModal').classList.remove('active');
        }

        function closeSvcModal() {
            document.getElementById('serviceModal').classList.remove('active');
        }

        window.onclick = function (e) {
            if (e.target.classList.contains('modal-overlay')) {
                closeModal();
                closeSvcModal();
            }
        };

        function escapeHtml(str) {
            if (!str) return '';
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        // Auto-hide toast
        setTimeout(() => {
            const toast = document.querySelector('.toast');
            if (toast) {
                toast.style.animation = 'fadeOut 0.4s ease forwards';
                setTimeout(() => toast.style.display = 'none', 400);
            }
        }, 3000);
    </script>
</body>

</html>