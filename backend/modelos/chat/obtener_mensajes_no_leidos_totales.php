<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//Comprueba si el usuario esta logueado
requerirLogin();

if (!isset($_SESSION["usuario"])) {
    echo json_encode(["ok" => false, "total" => 0]);
    exit;
}

try {
    $conn = conectar();
    $mi_id = $_SESSION["usuario"]["id"];

    $sql = "SELECT COUNT(*) as total 
            FROM mensaje 
            WHERE Usuario_receptor_id = ? 
            AND Leido = 0";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute([$mi_id]);
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "ok" => true,
        "total" => (int)$resultado['total']
    ]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
?>
