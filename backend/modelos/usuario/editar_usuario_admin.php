<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
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

    $usuarioId = $_POST['id'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $ciudad = $_POST['ciudad'] ?? null;
    $password = $_POST['password'] ?? null;
    $rol = $_POST['rol'] ?? null;

    if ($password) {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Contrasena = ?, Rol = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre, $ciudad, $hash, $rol, $usuarioId]);
    } else {
        $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Rol = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre, $ciudad, $rol, $usuarioId]);
    }


    $_SESSION['usuario']['nombre'] = $nombre;
    $_SESSION['usuario']['ciudad'] = $ciudad;
    $_SESSION['usuario']['Rol'] = $rol;

    echo json_encode(['usuario' => $_SESSION['usuario'], 'success' => true, 'mensaje' => 'Usuario actualizado correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'mensaje' => 'Error al actualizar el usuario']);
}

?>