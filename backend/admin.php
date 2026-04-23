<?php
require_once 'config.php';

// Handle delete action
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM contact_inquiries WHERE id = :id");
    $stmt->execute([':id' => (int)$_GET['delete']]);
    header("Location: admin.php?msg=deleted");
    exit();
}

// Handle mark as read
if (isset($_GET['read']) && is_numeric($_GET['read'])) {
    $stmt = $pdo->prepare("UPDATE contact_inquiries SET is_read = 1 WHERE id = :id");
    $stmt->execute([':id' => (int)$_GET['read']]);
    header("Location: admin.php?msg=read");
    exit();
}

// Handle mark as unread
if (isset($_GET['unread']) && is_numeric($_GET['unread'])) {
    $stmt = $pdo->prepare("UPDATE contact_inquiries SET is_read = 0 WHERE id = :id");
    $stmt->execute([':id' => (int)$_GET['unread']]);
    header("Location: admin.php?msg=unread");
    exit();
}

// Fetch filter
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
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Outfit', sans-serif;
            background: #030812;
            color: #e2e8f0;
            min-height: 100vh;
        }

        /* ─── Scrollbar ─── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030812; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 3px; }

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
            background: rgba(249,115,22,0.08);
            border: 1px solid rgba(249,115,22,0.2);
        }

        /* ─── Stats Cards ─── */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }

        .stat-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            border-color: rgba(249,115,22,0.3);
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

        .stat-value.orange { color: #fb923c; }
        .stat-value.green { color: #4ade80; }
        .stat-value.blue { color: #60a5fa; }

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
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.03);
            color: #94a3b8;
        }

        .filter-tab:hover, .filter-tab.active {
            background: rgba(249,115,22,0.12);
            border-color: rgba(249,115,22,0.3);
            color: #fb923c;
        }

        .search-box {
            display: flex;
            gap: 8px;
        }

        .search-box input {
            padding: 10px 16px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.04);
            color: #fff;
            font-size: 0.85rem;
            font-family: 'Outfit', sans-serif;
            outline: none;
            width: 260px;
            transition: border-color 0.2s;
        }

        .search-box input:focus {
            border-color: rgba(249,115,22,0.4);
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
            box-shadow: 0 4px 15px rgba(249,115,22,0.3);
        }

        /* ─── Table ─── */
        .table-wrapper {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
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

        thead { background: rgba(255,255,255,0.04); }

        th {
            padding: 16px 20px;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #94a3b8;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            white-space: nowrap;
        }

        td {
            padding: 16px 20px;
            font-size: 0.88rem;
            color: #cbd5e1;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            vertical-align: top;
        }

        tr { transition: background 0.2s; }
        tr:hover { background: rgba(249,115,22,0.03); }

        tr.unread {
            background: rgba(249,115,22,0.04);
            border-left: 3px solid #f97316;
        }

        tr.unread td:first-child { padding-left: 17px; }

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
            background: rgba(249,115,22,0.15);
            color: #fb923c;
            border: 1px solid rgba(249,115,22,0.3);
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
            background: rgba(34,197,94,0.08);
            border: 1px solid rgba(34,197,94,0.25);
            color: #4ade80;
        }
        .btn-read:hover { background: rgba(34,197,94,0.18); }

        .btn-unread {
            background: rgba(96,165,250,0.08);
            border: 1px solid rgba(96,165,250,0.25);
            color: #60a5fa;
        }
        .btn-unread:hover { background: rgba(96,165,250,0.18); }

        .btn-delete {
            background: rgba(239,68,68,0.08);
            border: 1px solid rgba(239,68,68,0.25);
            color: #f87171;
        }
        .btn-delete:hover { background: rgba(239,68,68,0.18); }

        .btn-view {
            background: rgba(249,115,22,0.08);
            border: 1px solid rgba(249,115,22,0.25);
            color: #fb923c;
        }
        .btn-view:hover { background: rgba(249,115,22,0.18); }

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
            background: rgba(34,197,94,0.15);
            border: 1px solid rgba(34,197,94,0.3);
            color: #4ade80;
        }

        .toast.delete {
            background: rgba(239,68,68,0.15);
            border: 1px solid rgba(239,68,68,0.3);
            color: #f87171;
        }

        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(-10px); }
        }

        /* ─── Modal ─── */
        .modal-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(4px);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal-overlay.active { display: flex; }

        .modal {
            background: #0a1628;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px;
            padding: 36px;
            max-width: 560px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: modalIn 0.3s ease;
        }

        @keyframes modalIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .modal h2 {
            font-size: 1.4rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 24px;
        }

        .modal h2 span { color: #fb923c; }

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
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 10px;
            word-wrap: break-word;
        }

        .modal-close {
            margin-top: 20px;
            padding: 10px 28px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            color: #fff;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Outfit', sans-serif;
            transition: all 0.2s;
        }

        .modal-close:hover {
            background: rgba(255,255,255,0.1);
        }

        /* ─── Responsive ─── */
        @media (max-width: 768px) {
            .admin-header { flex-direction: column; align-items: flex-start; }
            .toolbar { flex-direction: column; align-items: stretch; }
            .search-box { width: 100%; }
            .search-box input { width: 100%; }
            .admin-title { font-size: 1.5rem; }
        }
    </style>
</head>
<body>
    <?php if (isset($_GET['msg'])): ?>
        <div class="toast <?= $_GET['msg'] === 'deleted' ? 'delete' : '' ?>">
            <?php
            $messages = [
                'deleted' => '🗑️ Inquiry deleted successfully.',
                'read' => '✅ Marked as read.',
                'unread' => '📩 Marked as unread.',
            ];
            echo $messages[$_GET['msg']] ?? '';
            ?>
        </div>
    <?php endif; ?>

    <div class="admin-wrapper">
        <!-- Header -->
        <div class="admin-header">
            <div>
                <span class="admin-badge">🏗️ Admin Panel</span>
                <h1 class="admin-title" style="margin-top: 12px">Apex Structure <span>Inquiries</span></h1>
            </div>
        </div>

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
                <a href="admin.php" class="filter-tab <?= $filter === 'all' ? 'active' : '' ?>">All</a>
                <a href="admin.php?filter=unread" class="filter-tab <?= $filter === 'unread' ? 'active' : '' ?>">Unread</a>
                <a href="admin.php?filter=read" class="filter-tab <?= $filter === 'read' ? 'active' : '' ?>">Read</a>
            </div>
            <form class="search-box" method="GET" action="admin.php">
                <input type="hidden" name="filter" value="<?= htmlspecialchars($filter) ?>">
                <input type="text" name="search" placeholder="Search by name, phone, email..." value="<?= htmlspecialchars($search) ?>">
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
                                    <td class="message-cell" title="<?= htmlspecialchars($row['message'] ?: '') ?>"><?= htmlspecialchars($row['message'] ?: '—') ?></td>
                                    <td class="time-cell"><?= date('d M Y, h:i A', strtotime($row['submitted_at'])) ?></td>
                                    <td>
                                        <div class="action-btns">
                                            <button class="btn-action btn-view" onclick="showDetail(<?= htmlspecialchars(json_encode($row)) ?>)">View</button>
                                            <?php if ($row['is_read']): ?>
                                                <a href="admin.php?unread=<?= $row['id'] ?>" class="btn-action btn-unread">Unread</a>
                                            <?php else: ?>
                                                <a href="admin.php?read=<?= $row['id'] ?>" class="btn-action btn-read">Read</a>
                                            <?php endif; ?>
                                            <a href="admin.php?delete=<?= $row['id'] ?>" class="btn-action btn-delete" onclick="return confirm('Are you sure you want to delete this inquiry?')">Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Detail Modal -->
    <div class="modal-overlay" id="detailModal">
        <div class="modal">
            <h2>Inquiry <span>Details</span></h2>
            <div id="modalContent"></div>
            <button class="modal-close" onclick="closeModal()">Close</button>
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
                fetch('admin.php?read=' + data.id);
            }
        }

        function closeModal() {
            document.getElementById('detailModal').classList.remove('active');
        }

        document.getElementById('detailModal').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        // Auto-hide toast
        setTimeout(() => {
            const toast = document.querySelector('.toast');
            if (toast) toast.style.display = 'none';
        }, 3000);
    </script>
</body>
</html>
