<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST requests are allowed.']);
    exit();
}

// Read JSON body from React fetch
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
    exit();
}

$fullName    = trim($input['fullName'] ?? '');
$phoneNumber = trim($input['phoneNumber'] ?? '');
$email       = trim($input['email'] ?? '');
$projectType = trim($input['projectType'] ?? '');
$location    = trim($input['location'] ?? '');
$budgetRange = trim($input['budgetRange'] ?? '');
$message     = trim($input['message'] ?? '');

// Validation
if (empty($fullName) || empty($phoneNumber)) {
    echo json_encode(['success' => false, 'message' => 'Name and Phone Number are required.']);
    exit();
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO contact_inquiries (full_name, phone_number, email, project_type, location, budget_range, message)
        VALUES (:full_name, :phone_number, :email, :project_type, :location, :budget_range, :message)
    ");

    $stmt->execute([
        ':full_name'    => $fullName,
        ':phone_number' => $phoneNumber,
        ':email'        => $email,
        ':project_type' => $projectType,
        ':location'     => $location,
        ':budget_range' => $budgetRange,
        ':message'      => $message,
    ]);

    echo json_encode(['success' => true, 'message' => 'Inquiry submitted successfully!']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
