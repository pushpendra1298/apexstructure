<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$dbname = "apex_db";
$username = "apex_user";
$password = "Apex1234@#$%^&";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

$data = json_decode(file_get_contents("php://input"), true);

$fullName = $data['fullName'] ?? '';
$phoneNumber = $data['phoneNumber'] ?? '';
$email = $data['email'] ?? '';
$projectType = $data['projectType'] ?? '';
$location = $data['location'] ?? '';
$budgetRange = $data['budgetRange'] ?? '';
$message = $data['message'] ?? '';

if (empty($fullName) || empty($phoneNumber)) {
    echo json_encode([
        "success" => false,
        "message" => "Name and phone number are required"
    ]);
    exit;
}

$sql = "INSERT INTO contact_inquiries 
(full_name, phone_number, email, project_type, location, budget_range, message) 
VALUES (:full_name, :phone_number, :email, :project_type, :location, :budget_range, :message)";

$stmt = $conn->prepare($sql);

$result = $stmt->execute([
    ':full_name' => $fullName,
    ':phone_number' => $phoneNumber,
    ':email' => $email,
    ':project_type' => $projectType,
    ':location' => $location,
    ':budget_range' => $budgetRange,
    ':message' => $message
]);

if ($result) {
    echo json_encode([
        "success" => true,
        "message" => "Inquiry submitted successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to save inquiry"
    ]);
}
?>