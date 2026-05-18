<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $conn = conectar();

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit;
    }

    header("Content-Type: application/json");

    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['success' => false, 'message' => 'No estás autenticado']);
        exit;
    }

    $usuario_id = $_GET['id'];

    $sql = "UPDATE FROM usuario set Activo=0 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$usuario_id]);



    echo json_encode(['success' => true, 'message' => 'Usuario eliminado correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar el usuario']);
}

?>