<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//Comprueba si el usuario esta logueado
requerirLogin();

if (!isset($_SESSION["usuario"])) {
    echo json_encode(["ok" => false, "error" => "No hay sesión"]);
    exit;
}

$mi_id = $_SESSION["usuario"]["id"];
$otro_id = $_GET['otro_id'] ?? null;

try {
    $conn = conectar();

    // Mensajes privados: formateamos Fecha_envio para traer solo la hora
    $sql = "SELECT id, Contenido, Usuario_id, Usuario_receptor_id, 
                   TIME_FORMAT(Fecha_envio, '%H:%i') as Fecha_envio 
            FROM mensaje 
            WHERE (Usuario_id = ? AND Usuario_receptor_id = ?) 
            OR (Usuario_id = ? AND Usuario_receptor_id = ?) 
            ORDER BY Fecha_envio ASC";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$mi_id, $otro_id, $otro_id, $mi_id]);

    $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["ok" => true, "mensajes" => $mensajes]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
