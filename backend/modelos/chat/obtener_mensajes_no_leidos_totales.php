<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


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
            FROM mensaje m
            JOIN amistades a ON (
                (a.Usuario_solicita_id = m.Usuario_id AND a.Usuario_receptor_id = m.Usuario_receptor_id) OR 
                (a.Usuario_solicita_id = m.Usuario_receptor_id AND a.Usuario_receptor_id = m.Usuario_id)
            )
            LEFT JOIN bloqueos b ON (
                (b.Usuario_bloqueador_id = m.Usuario_id AND b.Usuario_bloqueado_id = m.Usuario_receptor_id) OR 
                (b.Usuario_bloqueador_id = m.Usuario_receptor_id AND b.Usuario_bloqueado_id = m.Usuario_id)
            )
            WHERE m.Usuario_receptor_id = ? 
            AND m.Leido = 0
            AND a.Estado = 'aceptado'
            AND b.id IS NULL
            AND m.Grupo_id IS NULL";
            
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
