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

    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuario WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($password, $usuario["Contrasena"])) {

        $_SESSION["usuario"] = [
            "id" => $usuario["id"],
            "nombre" => $usuario["Nombre"],
            "nick" => $usuario["Nick"] ?? "undefined",
            "email" => $usuario["Email"],
            "ciudad" => $usuario["Ciudad"] ?? "undefined",
            "rol" => $usuario["Rol"] ?? "User",
            "foto" => $usuario["Foto_perfil"] ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            "perfil_publico" => (int)($usuario["Perfil_publico"] ?? 1)
        ];

        echo json_encode(["ok" => true, "usuario" => $_SESSION["usuario"]]);
    } else {
        echo json_encode(["ok" => false, "error" => "Email o contraseña incorrectos"]);
    }

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
?>