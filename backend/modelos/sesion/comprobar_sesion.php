<?php
session_start();

$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header("Content-Type: application/json");

if (isset($_SESSION["usuario"])) {
    try {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
        $conn = conectar();
        $id = $_SESSION['usuario']['id'];
        
        $sqlAmigos = "SELECT COUNT(*) as total FROM amistad WHERE (Usuario_solicita_id = ? OR Usuario_recibe_id = ?) AND Estado = 'Aceptada'";
        $stmtAmigos = $conn->prepare($sqlAmigos);
        $stmtAmigos->execute([$id, $id]);
        $_SESSION['usuario']['total_amigos'] = $stmtAmigos->fetch(PDO::FETCH_ASSOC)['total'];

        $sqlMarcadores = "SELECT COUNT(*) as total FROM pin WHERE Usuario_id = ?";
        $stmtMarcadores = $conn->prepare($sqlMarcadores);
        $stmtMarcadores->execute([$id]);
        $_SESSION['usuario']['total_marcadores'] = $stmtMarcadores->fetch(PDO::FETCH_ASSOC)['total'];
    } catch(Exception $e) {}

    echo json_encode([
        "login" => true,
        "usuario" => $_SESSION["usuario"]
    ]);

} else {

    echo json_encode([
        "login" => false
    ]);

}
?>