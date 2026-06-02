<?php
$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
try {
    session_start();
    session_unset();
    session_destroy();
    echo json_encode(["ok" => true]);
} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => "Error al cerrar la sesión: " . $e->getMessage()]);
}
?>