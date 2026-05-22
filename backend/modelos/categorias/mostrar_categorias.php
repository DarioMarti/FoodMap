<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");


try {
    $conn = conectar();
    
    // Verificamos si se envía un usuario_id (por GET o POST)
    $usuario_id = $_GET['usuario_id'] ?? $_POST['usuario_id'] ?? null;

    if ($usuario_id) {
        // Muestra solo las categorías que tienen marcadores de ese usuario
        // También incluimos el conteo (count) de cuántos marcadores tiene en esa categoría
        $sql = "SELECT c.id, c.Nombre, c.Color, c.Icono, COUNT(mc.Marcador_id) as count 
                FROM categoria c
                JOIN marcador_categoria mc ON c.id = mc.Categoria_id
                JOIN marcador m ON mc.Marcador_id = m.id
                WHERE m.Usuario_id = :usuario_id
                GROUP BY c.id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
        $stmt->execute();
    } else {
        // Muestra todas las categorías (comportamiento por defecto)
        $stmt = $conn->prepare("SELECT * FROM categoria");
        $stmt->execute();
    }

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
