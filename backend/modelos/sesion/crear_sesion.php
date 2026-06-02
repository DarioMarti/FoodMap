<?php
function crearSesionUsuario($usuario) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $_SESSION["usuario"] = [
        "id" => $usuario["id"] ?? null,
        "nombre" => $usuario["Nombre"] ?? $usuario["nombre"] ?? "",
        "nick" => $usuario["Nick"] ?? $usuario["nick"] ?? "undefined",
        "email" => $usuario["Email"] ?? $usuario["email"] ?? "",
        "ciudad" => $usuario["Ciudad"] ?? $usuario["ciudad"] ?? "undefined",
        "rol" => $usuario["Rol"] ?? $usuario["rol"] ?? "cliente",
        "foto" => $usuario["Foto_perfil"] ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        "perfil_publico" => isset($usuario["Perfil_publico"]) ? (int)$usuario["Perfil_publico"] : 1
    ];
}
?>