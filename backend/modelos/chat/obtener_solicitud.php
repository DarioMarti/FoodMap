<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//Comprueba si el usuario esta logueado
requerirLogin();

if (!isset($_SESSION['usuario'])) {
    echo json_encode(["ok" => false, "error" => "Sesión no iniciada"]);
    exit;
}

$mi_id = $_SESSION['usuario']['id'];

try {
    $conn = conectar();

    $sql = "SELECT a.*, u.Nombre 
            FROM amistades a 
            JOIN usuario u ON a.Usuario_solicita_id = u.id 
            WHERE a.Usuario_receptor_id = ? AND a.Estado = 'pendiente'";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$mi_id]);

    $solicitudes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["ok" => true, "solicitudes" => $solicitudes]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
?>