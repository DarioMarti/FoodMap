<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//Comprueba si el usuario esta logueado
requerirLogin();

try {
    $conn = conectar();
    $sql = "SELECT m.*, c.Nombre, mc.Es_principal AS Categoria_EsPrincipal, c.Color AS Categoria_Color, c.Icono AS Categoria_Icono
    FROM marcador m
    LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
    LEFT JOIN categoria c ON mc.Categoria_id = c.id
    GROUP BY m.id;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}
