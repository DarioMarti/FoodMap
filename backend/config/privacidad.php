<?php
// backend/config/privacidad.php

// Asegurarnos de que la sesión esté iniciada si vamos a usar esta validación
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Verifica si hay un usuario logueado en la sesión
 * @return bool
 */
function estaLogueado() {
    return isset($_SESSION['usuario']) && !empty($_SESSION['usuario']['id']);
}

/**
 * Verifica si el usuario actual tiene rol de Administrador
 * @return bool
 */
function esAdministrador() {
    if (!estaLogueado()) {
        return false;
    }
    
    // Verificamos si existe la clave 'rol' y si equivale a admin
    $rol = strtolower($_SESSION['usuario']['rol'] ?? '');
    return $rol === 'admin' || $rol === 'administrador';
}

/**
 * Bloquea la ejecución y devuelve un error 403 (Prohibido) si el usuario NO es administrador.
 * Ideal para requerirlo al principio de los archivos PHP de administración.
 */
function requerirAdministrador() {
    if (!esAdministrador()) {
        header("HTTP/1.1 403 Forbidden");
        header("Content-Type: application/json");
        echo json_encode([
            "ok" => false, 
            "error" => "Acceso denegado. Se requieren permisos de administrador."
        ]);
        exit; // Detiene la ejecución del script actual
    }
}

/**
 * Bloquea la ejecución y devuelve un error 401 (No autorizado) si el usuario NO está logueado.
 */
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
