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
        echo json_encode(['success' => false, 'mensaje' => 'No estás autenticado']);
        exit;
    }

    $usuarioId = $_POST['id'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $ciudad = $_POST['ciudad'] ?? null;
    $password = $_POST['password'] ?? null;
    $rol = $_POST['rol'] ?? null;

    // 1. Procesar la foto de perfil si se ha seleccionado una nueva
    $nombreFoto = null;
    if (isset($_FILES['foto_perfil']) && $_FILES['foto_perfil']['error'] === UPLOAD_ERR_OK) {
        $extension = pathinfo($_FILES['foto_perfil']['name'], PATHINFO_EXTENSION);
        $nombreFoto = "avatar_" . time() . "_" . uniqid() . "." . $extension;

        $directorioDestino = $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/uploads/img/';
        if (!is_dir($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        $rutaDestino = $directorioDestino . $nombreFoto;
        if (!move_uploaded_file($_FILES['foto_perfil']['tmp_name'], $rutaDestino)) {
            $nombreFoto = null;
        }
    }

    if ($password) {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        if ($nombreFoto) {
            $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Contrasena = ?, Rol = ?, Foto_perfil = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $ciudad, $hash, $rol, $nombreFoto, $usuarioId]);
        } else {
            $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Contrasena = ?, Rol = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $ciudad, $hash, $rol, $usuarioId]);
        }
    } else {
        if ($nombreFoto) {
            $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Rol = ?, Foto_perfil = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $ciudad, $rol, $nombreFoto, $usuarioId]);
        } else {
            $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Rol = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $ciudad, $rol, $usuarioId]);
        }
    }

    if ($_SESSION['usuario']['id'] == $usuarioId) {
        $_SESSION['usuario']['nombre'] = $nombre;
        $_SESSION['usuario']['ciudad'] = $ciudad;
        $_SESSION['usuario']['rol'] = $rol;
        if ($nombreFoto) {
            $_SESSION['usuario']['foto'] = $nombreFoto;
        }
    }

    echo json_encode(['usuario' => $_SESSION['usuario'], 'success' => true, 'mensaje' => 'Usuario actualizado correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'mensaje' => 'Error al actualizar el usuario: ' . $e->getMessage()]);
}
?>