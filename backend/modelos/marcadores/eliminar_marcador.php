<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//Comprueba si el usuario esta logueado
requerirLogin();

$id = $_GET['id_marcador'] ?? 0;

try {
    $conn = conectar();

    $stmt = $conn->prepare("DELETE FROM marcador WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["ok" => true, "message" => "Marcador eliminado correctamente"]);
} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => "No se pudo eliminar el marcador"]);
}


?>