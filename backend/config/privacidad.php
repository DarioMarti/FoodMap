<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


function estaLogueado() {
    return isset($_SESSION['usuario']) && !empty($_SESSION['usuario']['id']);
}


function esAdministrador() {
    if (!estaLogueado()) {
        return false;
    }
        $rol = strtolower($_SESSION['usuario']['rol'] ?? '');
    return $rol === 'admin' || $rol === 'administrador';
}


function requerirAdministrador() {
    if (!esAdministrador()) {
        header("HTTP/1.1 403 Forbidden");
        header("Content-Type: application/json");
        echo json_encode([
            "ok" => false, 
            "error" => "Acceso denegado. Se requieren permisos de administrador."
        ]);
        exit;
    }
}

function requerirLogin() {
    if (!estaLogueado()) {
        header("HTTP/1.1 401 Unauthorized");
        header("Content-Type: application/json");
        echo json_encode([
            "ok" => false, 
            "error" => "Acceso denegado. Debes iniciar sesión."
        ]);
        exit;
    }
}
?>
