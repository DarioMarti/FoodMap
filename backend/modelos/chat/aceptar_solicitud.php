<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (!isset($_SESSION['usuario'])) {
    echo json_encode(["ok" => false, "error" => "Sesión no iniciada"]);
    exit;
}

$mi_id = $_SESSION['usuario']['id'];
$amigo_id = $_POST['amigo_id'] ?? null;

if (!$amigo_id) {
    echo json_encode(["ok" => false, "error" => "Falta el ID del amigo"]);
    exit;
}

try {
    $conn = conectar();

    $checkSql = "SELECT * FROM amistades WHERE Usuario_solicita_id = ? AND Usuario_receptor_id = ? AND Estado = 'pendiente'";
    $stmtCheck = $conn->prepare($checkSql);
    $stmtCheck->execute([$amigo_id, $mi_id]);

    if ($stmtCheck->rowCount() === 0) {
        echo json_encode(["ok" => false, "error" => "No existe solicitud pendiente o ya fue aceptada/rechazada"]);
        exit;
    }

    $sql = "UPDATE amistades SET Estado = 'aceptado' WHERE Usuario_solicita_id = ? AND Usuario_receptor_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$amigo_id, $mi_id]);

    echo json_encode(["ok" => true]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}