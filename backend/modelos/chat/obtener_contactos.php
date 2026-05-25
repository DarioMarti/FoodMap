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

try {
    $conn = conectar();
    $sql_amigos = "SELECT u.id, u.Nombre, u.Foto_perfil,
    (
        SELECT COUNT(*) 
        FROM mensaje m 
        WHERE m.Usuario_id = u.id          
        AND m.Usuario_receptor_id = ?      
        AND m.Leido = 0                    
    ) AS mensajes_no_leidos,
    (
        SELECT m2.Contenido
        FROM mensaje m2
        WHERE ((m2.Usuario_id = u.id AND m2.Usuario_receptor_id = ?)
          OR (m2.Usuario_id = ? AND m2.Usuario_receptor_id = u.id))
        ORDER BY m2.Fecha_envio DESC
        LIMIT 1
    ) AS ultimo_mensaje,
    (
        SELECT TIME_FORMAT(m3.Fecha_envio, '%H:%i')
        FROM mensaje m3
        WHERE ((m3.Usuario_id = u.id AND m3.Usuario_receptor_id = ?)
          OR (m3.Usuario_id = ? AND m3.Usuario_receptor_id = u.id))
        ORDER BY m3.Fecha_envio DESC
        LIMIT 1
    ) AS ultima_hora
    FROM amistades a 
    JOIN usuario u ON (u.id = a.Usuario_solicita_id OR u.id = a.Usuario_receptor_id) 
    LEFT JOIN bloqueos b ON (
    (b.Usuario_bloqueador_id = ? AND b.Usuario_bloqueado_id = u.id)
    OR
    (b.Usuario_bloqueado_id = ? AND b.Usuario_bloqueador_id = u.id)
)
WHERE (a.Usuario_solicita_id = ? OR a.Usuario_receptor_id = ?)
AND u.id != ? AND a.Estado = 'aceptado' AND b.id IS NULL";

    $stmt = $conn->prepare($sql_amigos);
    $stmt->execute([$mi_id, $mi_id, $mi_id, $mi_id, $mi_id, $mi_id, $mi_id, $mi_id, $mi_id, $mi_id]);
    $amigos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "ok" => true,
        "amigos" => $amigos
    ]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
