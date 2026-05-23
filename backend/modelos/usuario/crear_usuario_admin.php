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

    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $ciudad = $_POST['ciudad'] ?? '';
    $password = $_POST['password'] ?? '';
    $rol = $_POST['rol'] ?? 'user';

    if (!$nombre || !$email || !$password) {
        echo json_encode(['success' => false, 'mensaje' => 'Nombre, email y contraseña son obligatorios para crear un usuario']);
        exit;
    }

    $sql = "SELECT id FROM usuario WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'mensaje' => 'El correo electrónico ya está registrado en otra cuenta']);
        exit;
    }

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
            $nombreFoto = null; // Si ocurre un error al mover el archivo, lo dejamos como null
        }
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    if ($nombreFoto) {
        $sql = "INSERT INTO usuario (Nombre, Email, Ciudad, Contrasena, Rol, Foto_perfil) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre, $email, $ciudad, $hash, $rol, $nombreFoto]);
    } else {
        $sql = "INSERT INTO usuario (Nombre, Email, Ciudad, Contrasena, Rol) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre, $email, $ciudad, $hash, $rol]);
    }

    echo json_encode(['success' => true, 'mensaje' => 'Usuario creado correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'mensaje' => 'Error al crear usuario: ' . $e->getMessage()]);
}
?>