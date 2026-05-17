<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['usuario'])) {
    echo json_encode([
        "logged" => true,
        "usuario" => $_SESSION['usuario']
    ]);
} else {
    echo json_encode([
        "logged" => false,
        "error" => "Sesión no iniciada"
    ]);
}
?>