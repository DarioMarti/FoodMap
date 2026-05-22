<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
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

    $passwordHash = password_hash($passwordUser, PASSWORD_DEFAULT);

    //Comprobar si existe el email
    $sql = "SELECT * FROM usuario WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    //Si no existe el email, se registra al usuario
    if (!$usuario) {
        $sql = "INSERT INTO usuario (Nombre, Email, Contrasena) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre, $email, $passwordHash]);

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
        // Solo enviamos esto si el usuario SI existía (correo duplicado)
        echo json_encode(["ok" => false, "error" => "El correo ya está registrado"]);
    }

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
?>