<?php
session_start();
if (!isset($_SESSION['super_user_id'])) {
    header("Location: SuperUserSignIn.html");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Super User Dashboard</title>
</head>
<body>
    <h1>Welcome, <?php echo $_SESSION['super_user_name']; ?>!</h1>
    <p>This is the Super User Dashboard.</p>
    <a href="logout.php">Logout</a>
</body>
</html>