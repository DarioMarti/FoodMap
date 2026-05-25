<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$mi_id = $_SESSION['usuario']['id'] ?? 0;
$nombre = $_POST['nombre'] ?? "";

try {
    $conn = conectar();

    $sql = "SELECT u.id, u.Nombre, u.Foto_perfil,
                CASE WHEN s.id IS NOT NULL THEN 1 ELSE 0 END AS solicitud_enviada,
                CASE WHEN r.id IS NOT NULL THEN 1 ELSE 0 END AS solicitud_recibida,
                CASE WHEN a.id IS NOT NULL THEN 1 ELSE 0 END AS ya_amigos,
                CASE WHEN b1.id IS NOT NULL THEN 1 ELSE 0 END AS yo_lo_bloquee
            FROM usuario u
            LEFT JOIN bloqueos b1 ON (b1.Usuario_bloqueador_id = ? AND b1.Usuario_bloqueado_id = u.id)
            LEFT JOIN bloqueos b2 ON (b2.Usuario_bloqueado_id = ? AND b2.Usuario_bloqueador_id = u.id)
            LEFT JOIN amistades s ON (
                s.Usuario_solicita_id = ? AND s.Usuario_receptor_id = u.id AND s.Estado = 'pendiente'
            )
            LEFT JOIN amistades r ON (
                r.Usuario_solicita_id = u.id AND r.Usuario_receptor_id = ? AND r.Estado = 'pendiente'
            )
            LEFT JOIN amistades a ON (
                ((a.Usuario_solicita_id = ? AND a.Usuario_receptor_id = u.id) OR (a.Usuario_solicita_id = u.id AND a.Usuario_receptor_id = ?))
                AND a.Estado = 'aceptado'
            )
            WHERE u.Nombre LIKE ? 
            AND u.id != ? 
            AND b2.id IS NULL
            AND u.Perfil_publico = 1";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$mi_id, $mi_id, $mi_id, $mi_id, $mi_id, $mi_id, "%$nombre%", $mi_id]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
