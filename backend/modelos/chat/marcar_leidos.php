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

$mi_id     = $_SESSION["usuario"]["id"];
$emisor_id = $_POST["emisor_id"] ?? null;  // el amigo cuyo chat abrimos

if (!$emisor_id) {
    echo json_encode(["ok" => false, "error" => "Falta emisor_id"]);
    exit;
}

try {
    $conn = conectar();

    $sql = "UPDATE mensaje 
            SET Leido = 1 
            WHERE Usuario_id = ? 
            AND Usuario_receptor_id = ? 
            AND Leido = 0 
            AND Grupo_id IS NULL";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$emisor_id, $mi_id]);

    echo json_encode(["ok" => true, "actualizados" => $stmt->rowCount()]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
?>
