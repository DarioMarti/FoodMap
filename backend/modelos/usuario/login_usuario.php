<?php

include __DIR__ . '/' . $_SERVER['DOCUMENT_ROOT'] . "/conexion.php";
session_start();

$conn = conectar();


$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM usuarios WHERE email = ? and password = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email, $password]);
$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();


if (!isset($_SESSION['usuario'])) {
    $_SESSION["usuario"] = [
        "id" => $usuario["id"],
        "nombre" => $usuario["nombre"],
        "email" => $usuario["email"],
        "rol" => $usuario["rol"] ?? "User"
    ];


}

?>