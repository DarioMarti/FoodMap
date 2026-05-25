<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//Comprueba si el usuario esta logueado
requerirLogin();

$mi_id = $_SESSION['usuario']['id'] ?? null;
$id_amigo = $_POST['id'] ?? null;

if (!$mi_id || !$id_amigo) {
    echo json_encode(["ok" => false, "mensaje" => "Datos incompletos"]);
    exit;
}

try {
    $conn = conectar();

    $sqlBorrar = "DELETE FROM bloqueos WHERE Usuario_bloqueador_id = ? AND Usuario_bloqueado_id = ?";
    $stmtBorrar = $conn->prepare($sqlBorrar);
    $stmtBorrar->execute([$mi_id, $id_amigo]);

    echo json_encode(["ok" => true, "mensaje" => "Usuario desbloqueado"]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "mensaje" => "El usuario no se pudo desbloquear."]);
}
