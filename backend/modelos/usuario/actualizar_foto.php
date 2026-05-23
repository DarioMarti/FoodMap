<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");

//Comprueba si el usuario esta logueado
requerirLogin();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header("Content-Type: application/json");

if (!isset($_SESSION['usuario'])) {
    echo json_encode(['ok' => false, 'error' => 'No estás autenticado']);
    exit;
}

try {
    $conn = conectar();
    $usuarioId = $_SESSION['usuario']['id'];

    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $foto = $_FILES['foto'];
        $directorioDestino = $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/uploads/img/';
        
        // Crear directorio si no existe
        if (!file_exists($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        // Generar nombre único para evitar sobrescribir y cache
        $extension = pathinfo($foto['name'], PATHINFO_EXTENSION);
        $nombreArchivo = 'user_' . $usuarioId . '_' . time() . '.' . $extension;
        $rutaDestino = $directorioDestino . $nombreArchivo;

        if (move_uploaded_file($foto['tmp_name'], $rutaDestino)) {
            // Actualizar base de datos
            $sql = "UPDATE usuario SET Foto_perfil = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombreArchivo, $usuarioId]);

            // Actualizar sesión
            $_SESSION['usuario']['foto'] = $nombreArchivo;

            echo json_encode(['ok' => true, 'usuario' => $_SESSION['usuario'], 'message' => 'Foto actualizada']);
        } else {
            echo json_encode(['ok' => false, 'error' => 'Error al guardar la imagen en el servidor']);
        }
    } else {
        echo json_encode(['ok' => false, 'error' => 'No se recibió ninguna imagen válida']);
    }

} catch (Exception $e) {
    echo json_encode(['ok' => false, 'error' => 'Error de servidor: ' . $e->getMessage()]);
}
?>
