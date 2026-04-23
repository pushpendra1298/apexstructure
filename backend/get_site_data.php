<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'config.php';

try {
    // Fetch Settings
    $settingsRows = $pdo->query("SELECT setting_key, setting_value FROM site_settings")->fetchAll(PDO::FETCH_ASSOC);
    $settings = [];
    foreach ($settingsRows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    // Fetch Services
    $services = $pdo->query("SELECT * FROM services ORDER BY display_order ASC, name ASC")->fetchAll(PDO::FETCH_ASSOC);

    // Fetch Approved Reviews
    $reviews = $pdo->query("SELECT client_name as client, role, rating, feedback, DATE_FORMAT(submitted_at, '%d %b, %Y') as date FROM client_reviews WHERE is_approved = 1 ORDER BY submitted_at DESC LIMIT 20")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'settings' => $settings,
        'services' => $services,
        'reviews' => $reviews
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
