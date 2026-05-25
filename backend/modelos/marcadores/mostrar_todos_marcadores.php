<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Cache-Control: no-cache, no-store, must-revalidate"); // Evitar caché
header("Pragma: no-cache");
header("Expires: 0");

//Comprueba si el usuario esta logueado
requerirLogin();

try {
    $conn = conectar();
    $sql = "SELECT m.*, c.Nombre, mc.Es_principal AS Categoria_EsPrincipal, c.Color AS Categoria_Color, c.Icono AS Categoria_Icono, u.Nombre AS Nombre_Usuario
    FROM marcador m
    LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
    LEFT JOIN categoria c ON mc.Categoria_id = c.id
    LEFT JOIN usuario u ON m.Usuario_id = u.id
    GROUP BY m.id;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
