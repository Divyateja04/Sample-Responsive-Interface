<?php
include 'superuserdatabase.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validation checks
    if ($password !== $confirm_password) {
        die("Passwords do not match!");
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare insert query
    $stmt = $conn->prepare("INSERT INTO super_users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    // Debugging output
    if ($stmt->execute()) {
        echo "Inserted successfully!";
    } else {
        echo "Error inserting: " . $stmt->error;   // 👈 This line prints the error directly
    }
}
?>