<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//Comprueba si el usuario esta logueado
requerirLogin();

$mi_id = $_SESSION['usuario']['id'];
$id_amigo = $_POST['id'] ?? null;

if (!$id_amigo) {
    echo json_encode(["ok" => false, "mensaje" => "ID no proporcionado"]);
    exit;
}

try {
    $conn = conectar();

    // 1. Insertar en la tabla de BLOQUEOS
    $sqlBloqueo = "INSERT INTO bloqueos (Usuario_bloqueador_id, Usuario_bloqueado_id) VALUES (?, ?)";
    $stmtBloqueo = $conn->prepare($sqlBloqueo);
    $stmtBloqueo->execute([$mi_id, $id_amigo]);

    // 2. Borrar cualquier rastro de AMISTAD o SOLICITUD
    $sqlBorrar = "DELETE FROM amistades 
                  WHERE (Usuario_solicita_id = ? AND Usuario_receptor_id = ?) 
                     OR (Usuario_solicita_id = ? AND Usuario_receptor_id = ?)";
    $stmtBorrar = $conn->prepare($sqlBorrar);
    $stmtBorrar->execute([$mi_id, $id_amigo, $id_amigo, $mi_id]);

    echo json_encode(["ok" => true, "mensaje" => "Usuario bloqueado y eliminado de amigos"]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "mensaje" => "El usuario no se pudo bloquear."]);
}
