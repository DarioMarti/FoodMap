<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header("Content-Type: application/json");

try {
    $conn = conectar();

    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $passwordUser = $_POST['password'];

    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $passwordUser)) {
        echo json_encode(["ok" => false, "error" => "La contraseña no cumple los requisitos de seguridad."]);
        exit;
    }

    $passwordHash = password_hash($passwordUser, PASSWORD_DEFAULT);

    $sql = "SELECT * FROM usuario WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        $rutaRelativa = null;

        if (isset($_FILES['foto_perfil']) && $_FILES['foto_perfil']['error'] === UPLOAD_ERR_OK) {
            $directorioSubida = $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/archivos_subidos/';
            if (!file_exists($directorioSubida)) {
                mkdir($directorioSubida, 0777, true);
            }

            $nombreOriginal = basename($_FILES['foto_perfil']['name']);
            $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
            $nombreNuevo = uniqid('foto_', true) . '.' . $extension;
            $rutaFisica = $directorioSubida . $nombreNuevo;

            if (move_uploaded_file($_FILES['foto_perfil']['tmp_name'], $rutaFisica)) {
                $rutaRelativa = '/foodmap/backend/archivos_subidos/' . $nombreNuevo;
            }
        }

        if ($rutaRelativa) {
            $sql = "INSERT INTO usuario (Nombre, Email, Contrasena, Foto_perfil) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $email, $passwordHash, $rutaRelativa]);
        } else {
            $sql = "INSERT INTO usuario (Nombre, Email, Contrasena) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nombre, $email, $passwordHash]);
        }

        $sql = "SELECT * FROM usuario WHERE Email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            $_SESSION["usuario"] = [
                "id" => $usuario["id"],
                "nombre" => $usuario["Nombre"],
                "email" => $usuario["Email"],
                "rol" => $usuario["Rol"] ?? "User",
                "foto" => $usuario["Foto_perfil"] ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                "perfil_publico" => 1
            ];

            echo json_encode(["ok" => true, "mensaje" => "Usuario registrado exitosamente"]);
        } else {
            echo json_encode(["ok" => false, "error" => "No se pudo recuperar el usuario tras el registro"]);
        }
    } else {
        echo json_encode(["ok" => false, "error" => "El correo ya está registrado"]);
    }

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
?>