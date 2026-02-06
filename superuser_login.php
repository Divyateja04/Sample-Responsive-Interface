<?php
include 'superuserdatabase.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, name, password FROM super_users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Save session
            $_SESSION['super_user_id'] = $row['id'];
            $_SESSION['super_user_name'] = $row['name'];
            $_SESSION['super_user_email'] = $email;

            // Redirect to dashboard
            header("Location: superuser_dashboard.php");
            exit();
        } else {
            echo "<script>alert('Invalid password!'); window.location.href='SuperUserSignIn.html';</script>";
        }
    } else {
        echo "<script>alert('Super user not found!'); window.location.href='SuperUserSignIn.html';</script>";
    }
}
?>