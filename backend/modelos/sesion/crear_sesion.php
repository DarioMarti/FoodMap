<?php
include __DIR__ . '/' . $_SERVER['DOCUMENT_ROOT'] . "/conexion.php";
session_start();

$conn = conectar();





if (!isset($_SESSION['usuario'])) {
    $_SESSION["usuario"] = [
        "id" => $usuario["id"],
        "nombre" => $usuario["nombre"],
        "nick" => $usuario["nick"],
        "email" => $usuario["email"],
        "rol" => $usuario["rol"] ?? "cliente",
        "ciudad" => $usuario["ciudad"] ?? ""
    ];


}

?>