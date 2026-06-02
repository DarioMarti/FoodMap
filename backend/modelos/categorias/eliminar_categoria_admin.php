<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

//Comprueba si el usuario es admin
requerirAdministrador();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
header("Content-Type: application/json");

try {
    $conn = conectar();

    $id = $_POST['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'mensaje' => 'ID no proporcionado']);
        exit;
    }

    $sql = "DELETE FROM categoria WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'mensaje' => 'Categoría eliminada correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'mensaje' => 'Error al eliminar categoría. (Puede que tenga marcadores asociados)']);
}
?>