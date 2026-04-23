<?php

$host = 'localhost';
$dbname = 'apex_db';
$username = 'apex_user';
$password = 'Apex1234@#$%^&';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create contact_inquiries table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `contact_inquiries` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `full_name` VARCHAR(255) NOT NULL,
            `phone_number` VARCHAR(50) NOT NULL,
            `email` VARCHAR(255) DEFAULT NULL,
            `project_type` VARCHAR(255) DEFAULT NULL,
            `location` VARCHAR(255) DEFAULT NULL,
            `budget_range` VARCHAR(100) DEFAULT NULL,
            `message` TEXT DEFAULT NULL,
            `is_read` TINYINT(1) DEFAULT 0,
            `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    // Create site_settings table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `site_settings` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `setting_key` VARCHAR(100) NOT NULL UNIQUE,
            `setting_value` TEXT DEFAULT NULL,
            `label` VARCHAR(255) DEFAULT NULL,
            `category` VARCHAR(50) DEFAULT 'general',
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    // Create services table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `services` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `name` VARCHAR(255) NOT NULL,
            `description` TEXT DEFAULT NULL,
            `image_url` TEXT DEFAULT NULL,
            `display_order` INT DEFAULT 0,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    // Ensure display_order column exists
    try {
        $pdo->exec("ALTER TABLE `services` ADD COLUMN `display_order` INT DEFAULT 0 AFTER `image_url` ");
    } catch (PDOException $e) {
        // Column probably exists
    }

    // Create admin_users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admin_users` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `username` VARCHAR(100) NOT NULL UNIQUE,
            `password_hash` VARCHAR(255) NOT NULL,
            `full_name` VARCHAR(255) DEFAULT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    // Insert default settings if not exist
    $defaultSettings = [
        ['phone_number', '+92 300 1234567', 'Phone Number', 'contact'],
        ['email', 'info@apexstructure.com', 'Email Address', 'contact'],
        ['address', 'Office #1, Street 2, City, Country', 'Physical Address', 'contact'],
        ['whatsapp', '+92 300 1234567', 'WhatsApp Number', 'contact'],
    ];

    $stmt = $pdo->prepare("INSERT IGNORE INTO site_settings (setting_key, setting_value, label, category) VALUES (?, ?, ?, ?)");
    foreach ($defaultSettings as $setting) {
        $stmt->execute($setting);
    }

    // Insert default admin user (username: admin, password: password123)
    $username = 'admin';
    $password = 'password123';
    $hash = password_hash($password, PASSWORD_DEFAULT);
    
    $checkUser = $pdo->prepare("SELECT COUNT(*) FROM admin_users WHERE username = ?");
    $checkUser->execute([$username]);
    if ($checkUser->fetchColumn() == 0) {
        $stmt = $pdo->prepare("INSERT INTO admin_users (username, password_hash, full_name) VALUES (?, ?, ?)");
        $stmt->execute([$username, $hash, 'Apex Admin']);
        echo "✅ Default admin user created (admin / password123).<br>";
    }

    echo "✅ Connected to database successfully.<br>";
    echo "✅ Tables created successfully or already exist.<br>";
    echo "✅ Default settings initialized.<br>";
    echo "<br><strong>🎉 Setup complete.</strong>";
} catch (PDOException $e) {
    die("❌ Setup failed: " . $e->getMessage());
}
?>