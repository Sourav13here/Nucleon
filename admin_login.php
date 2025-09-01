<?php
session_start();
if ($_POST['username'] === 'admin' && $_POST['password'] === 'Nucleon@2k25') {
    $_SESSION['admin'] = true;
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
