require_once 'config.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data provided"]);
    exit;
}

try {

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
    
    $stmt = $pdo->prepare($sql);
    
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
        echo json_encode(["success" => true, "message" => "Inquiry submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save inquiry"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>