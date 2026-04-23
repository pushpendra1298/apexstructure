<?php
/**
 * Run this file ONCE to create the database and table.
 * Access via browser: http://localhost/apexstructure/backend/setup_database.php
 */

$host = 'localhost';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `apex_contacts` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Database 'apex_contacts' created successfully.<br>";

    // Select the database
    $pdo->exec("USE `apex_contacts`");

    // Create contacts table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `contact_inquiries` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `full_name` VARCHAR(255) NOT NULL,
            `phone_number` VARCHAR(50) NOT NULL,
            `email` VARCHAR(255) DEFAULT NULL,
            `project_type` VARCHAR(255) DEFAULT NULL,
            `location` VARCHAR(255) DEFAULT NULL,
            `budget_range` VARCHAR(100) DEFAULT NULL,
            `message` TEXT DEFAULT NULL,
            `is_read` TINYINT(1) DEFAULT 0,
            `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    echo "✅ Table 'contact_inquiries' created successfully.<br>";

    echo "<br><strong>🎉 Setup complete! You can now use the contact form and admin panel.</strong>";
    echo "<br><br><a href='admin.php'>Go to Admin Panel →</a>";
} catch (PDOException $e) {
    die("❌ Setup failed: " . $e->getMessage());
}
?>
