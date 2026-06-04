<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['usuario'])) {
    try {
        $conn = conectar();
        $id = $_SESSION['usuario']['id'];
        
        $sqlAmigos = "SELECT COUNT(*) as total FROM amistades WHERE (Usuario_solicita_id = ? OR Usuario_receptor_id = ?) AND Estado = 'aceptado'";
        $stmtAmigos = $conn->prepare($sqlAmigos);
        $stmtAmigos->execute([$id, $id]);
        $_SESSION['usuario']['total_amigos'] = $stmtAmigos->fetch(PDO::FETCH_ASSOC)['total'];

        $sqlMarcadores = "SELECT COUNT(*) as total FROM marcador WHERE Usuario_id = ?";
        $stmtMarcadores = $conn->prepare($sqlMarcadores);
        $stmtMarcadores->execute([$id]);
        $_SESSION['usuario']['total_marcadores'] = $stmtMarcadores->fetch(PDO::FETCH_ASSOC)['total'];
    } catch(Exception $e) {}

    echo json_encode([
        "logged" => true,
        "usuario" => $_SESSION['usuario']
    ]);
} else {
    echo json_encode([
        "logged" => false,
        "error" => "Sesión no iniciada"
    ]);
}
?>