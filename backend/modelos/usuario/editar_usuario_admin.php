<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

//Comprueba si el usuario es administrador
requerirAdministrador();

try {
    $conn = conectar();

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit;
    }

    header("Content-Type: application/json");

    $usuarioId = $_POST['id'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $ciudad = $_POST['ciudad'] ?? null;
    $password = $_POST['password'] ?? null;
    $rol = $_POST['rol'] ?? null;

    // Procesa la foto de perfil si se ha seleccionado una nueva
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


    if ($nombreFoto) {
        if ($password) {
            if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $password)) {
                echo json_encode(['success' => false, 'mensaje' => 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.']);
                exit;
            }
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Contrasena = ?, Rol = ?, Foto_perfil = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $ciudad, $hash, $rol, $nombreFoto, $usuarioId]);
        } else {
            $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Rol = ?, Foto_perfil = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $ciudad, $rol, $nombreFoto, $usuarioId]);
        }
    } else {
        if ($password) {
            if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $password)) {
                echo json_encode(['success' => false, 'mensaje' => 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.']);
                exit;
            }
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "UPDATE usuario SET Nombre = ?, Ciudad = ?, Contrasena = ?, Rol = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $ciudad, $hash, $rol, $usuarioId]);
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