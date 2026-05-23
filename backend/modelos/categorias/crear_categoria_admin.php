<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
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
    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['success' => false, 'mensaje' => 'No estás autenticado']);
        exit;
    }

    $nombre = $_POST['nombre'] ?? '';
    $color = $_POST['color'] ?? '#000000';
    $icono = $_POST['icono'] ?? 'MapPin';

    if (!$nombre) {
        echo json_encode(['success' => false, 'mensaje' => 'El nombre es obligatorio']);
        exit;
    }

    $sql = "INSERT INTO categoria (Nombre, Color, Icono) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nombre, $color, $icono]);

    echo json_encode(['success' => true, 'mensaje' => 'Categoría creada correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'mensaje' => 'Error al crear categoría']);
}
?>