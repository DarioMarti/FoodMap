<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

//Comprueba si el usuario es administrador
requerirAdministrador();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
header("Content-Type: application/json");

try {
    $conn = conectar();

    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['success' => false, 'mensaje' => 'No estás autenticado']);
        exit;
    }

    $usuarioId = $_POST['id'] ?? null;

    if (!$usuarioId) {
        echo json_encode(['success' => false, 'mensaje' => 'ID de usuario no proporcionado']);
        exit;
    }

    $sql = "UPDATE usuario SET Activo = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$usuarioId]);

    echo json_encode(['success' => true, 'mensaje' => 'Usuario eliminado correctamente']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'mensaje' => 'Error al eliminar el usuario']);
}
?>