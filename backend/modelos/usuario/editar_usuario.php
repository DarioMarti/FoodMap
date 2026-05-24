<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


//Comprueba si el usuario esta logueado
requerirLogin();

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

    $usuarioId = $_SESSION['usuario']['id'];
    $nombre = $_POST['nombre'] ?? null;
    $ciudad = $_POST['ciudad'] ?? null;
    $nick = $_POST['nick'] ?? null;

    $sql = "UPDATE usuario SET Nombre = ?, Nick = ?, Ciudad = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nombre, $nick, $ciudad, $usuarioId]);

    $_SESSION['usuario']['nombre'] = $nombre;
    $_SESSION['usuario']['ciudad'] = $ciudad;
    $_SESSION['usuario']['nick'] = $nick;

    echo json_encode(['usuario' => $_SESSION['usuario'], 'success' => true, 'message' => 'Usuario actualizado correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el usuario']);
}

?>