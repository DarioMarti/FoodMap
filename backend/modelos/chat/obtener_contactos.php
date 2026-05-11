<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"])) {
    echo json_encode(["ok" => false, "error" => "No hay sesión"]);
    exit;
}

$mi_id = $_SESSION["usuario"]["id"];

try {
    $conn = conectar();
    $sql_amigos = "SELECT u.id, u.Nombre, u.Foto_perfil 
                   FROM amistades a
                   JOIN usuario u ON (u.id = a.Usuario_solicita_id OR u.id = a.Usuario_receptor_id)
                   WHERE (a.Usuario_solicita_id = ? OR a.Usuario_receptor_id = ?)
                   AND u.id != ? 
                   AND a.Estado = 'aceptado'";

    $stmt = $conn->prepare($sql_amigos);
    $stmt->execute([$mi_id, $mi_id, $mi_id]);
    $amigos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Sentencia para obtener los grupos
    $sql_grupos = "SELECT id, Nombre, Imagen_url FROM grupo";
    $stmt_grupos = $conn->query($sql_grupos);
    $grupos = $stmt_grupos->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "ok" => true,
        "amigos" => $amigos,
        "grupos" => $grupos
    ]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
