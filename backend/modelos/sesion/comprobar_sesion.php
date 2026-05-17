<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header("Content-Type: application/json");

if (isset($_SESSION["usuario"])) {

    echo json_encode([
        "login" => true,
        "usuario" => $_SESSION["usuario"]
    ]);

} else {

    echo json_encode([
        "login" => false
    ]);

}
?>