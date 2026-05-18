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

    // Comprobamos si ya existe una solicitud o amistad
    $checkSql = "SELECT * FROM amistades WHERE (Usuario_solicita_id = ? AND Usuario_receptor_id = ?) OR (Usuario_solicita_id = ? AND Usuario_receptor_id = ?)";
    $stmtCheck = $conn->prepare($checkSql);
    $stmtCheck->execute([$mi_id, $amigo_id, $amigo_id, $mi_id]);

    if ($stmtCheck->rowCount() > 0) {
        echo json_encode(["ok" => false, "error" => "Ya existe una relación o solicitud pendiente"]);
        exit;
    }

    // Insertamos la nueva solicitud como pendiente
    $sql = "INSERT INTO amistades (Usuario_solicita_id, Usuario_receptor_id, Estado) VALUES (?, ?, 'pendiente')";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$mi_id, $amigo_id]);

    echo json_encode(["ok" => true, "mensaje" => "Solicitud enviada exitosamente"]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => 'Error al enviar la solicitud']);
}
