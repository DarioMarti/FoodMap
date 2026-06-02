<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/modelos/sesion/crear_sesion.php';
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

    $email = $_POST['email'];
    $password = $_POST['password'];

    //Busca el usuario por email
    $sql = "SELECT * FROM usuario WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    //Si encuentra el usuario comprueba la contraseña
    if ($usuario && password_verify($password, $usuario["Contrasena"])) {
        if ($usuario["Activo"] == 0) {
            echo json_encode(["ok" => false, "error" => "Tu cuenta ha sido desactivada."]);
            exit;
        }

        crearSesionUsuario($usuario);

        echo json_encode(["ok" => true, "usuario" => $_SESSION["usuario"]]);
    } else {
        echo json_encode(["ok" => false, "error" => "Email o contraseña incorrectos"]);
    }

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
?>