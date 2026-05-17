<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$mi_id = $_SESSION['usuario']['id'] ?? 0;
$nombre = $_POST['nombre'] ?? "";

try {
    $conn = conectar();

    $sql = "SELECT u.id, u.Nombre, u.Foto_perfil 
            FROM usuario u
            LEFT JOIN bloqueos b ON (
                (b.Usuario_bloqueador_id = ? AND b.Usuario_bloqueado_id = u.id)
                OR
                (b.Usuario_bloqueado_id = ? AND b.Usuario_bloqueador_id = u.id)
            )
            WHERE u.Nombre LIKE ? 
            AND u.id != ? 
            AND b.id IS NULL";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$mi_id, $mi_id, "%$nombre%", $mi_id]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
