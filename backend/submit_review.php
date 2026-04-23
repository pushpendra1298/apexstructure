<?php
require_once 'config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["status" => "error", "message" => "No data provided"]);
    exit;
}

$name = $input['client_name'] ?? '';
$role = $input['role'] ?? 'Client';
$rating = $input['rating'] ?? 0;
$feedback = $input['feedback'] ?? '';

if (empty($name) || empty($feedback) || $rating < 1) {
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO client_reviews (client_name, role, rating, feedback) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $role, (int)$rating, $feedback]);
    
    echo json_encode(["status" => "success", "message" => "Review submitted for approval"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Submission failed: " . $e->getMessage()]);
}
